/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    FlatList,
    Dimensions
} from 'react-native';
import {connect} from 'react-redux';
import ItemRow from './caricatureRow';
import * as ConstValue from '../../Const/constValue';
import HttpRequest from '../../utils/httpRequest';
import * as HttpRequestKeys from '../../utils/httpRequestKeys';

const {width, height} = Dimensions.get('window');
let page = 1;
let isLoadData = true;

class caricature extends Component<{}> {

    constructor(props){

        super(props);
        this.state={
            data: [],
            refreshing: false,
        };

        this.renderItem = this.renderItem.bind(this);
        this.loadData = this.loadData.bind(this);
        this.refresh = this.refresh.bind(this);
    }
    componentDidMount() {
        //易源数据->黑白漫画
        this.refresh();
    }

    /*加载网络数据*/
    loadData(page){
        const types = [ '/category/weimanhua/kbmh', //恐怖漫画
                        '/category/weimanhua/gushimanhua', //故事漫画
                        '/category/duanzishou', //段子手
                        '/category/lengzhishi', //冷知识
                        '/category/gaoxiao', //搞笑
                        '/category/mengchong']; //萌宠

        const tag = Math.floor(Math.random()*6);

        HttpRequest({
            mode: 'POST',
            url: 'http://route.showapi.com/958-1?showapi_appid='+HttpRequestKeys.Yi_Yuan_App_id+'&showapi_sign='+HttpRequestKeys.Yi_Yuan_App_secret+'&page='+String(page)+'&type='+types[tag],
            params: null,
            loading: ()=>{
            },
            success: (responseData)=>{

                const showapi_res_code = responseData.showapi_res_code;
                const body = responseData.showapi_res_body;
                console.log('958body', body);

                if (showapi_res_code == 0){
                    if (body.pagebean.contentlist){
                        this.setState({
                            data: this.state.data.concat(body.pagebean.contentlist),
                        })
                    }
                }
            },
            error: (errorInfo)=>{
                if (page === 1){
                }else
                    page--;
            },
            finish:()=>{
                this.setState({
                    refreshing: false,
                });
                isLoadData = false
            }
        });
    }


    /*row*/
    renderItem(item){
        return (
            <ItemRow item={item}
                     onClick={()=>{
                         this.props.navigator.navigate('CaricatureDetail', {
                             title: item.title,
                             itemID: item.id
                         });
                     }}
            />
        )
    }

    /*下拉刷新*/
    refresh() {
        this.setState({
            refreshing: true,
            data: []
        }, ()=>{
            page = 1;
            this.loadData(page);
        });

    }

    /*加载更多*/
    loadMore(){
        console.log('加载更多');
        if (isLoadData){
        }else {
            page++;
            this.loadData(page);
        }
    }
    render() {
        return (
            <View style={styles.container}>
                <FlatList
                    ref="flatList"
                    data={this.state.data} // 数据
                    renderItem={({item}) => this.renderItem(item)} // row
                    horizontal={false} // 水平还是垂直
                    refreshing={this.state.refreshing} // 是否刷新 ，自带刷新控件
                    onRefresh={()=>{

                        this.refresh();
                    }} // 刷新方法,写了此方法，下拉才会出现  刷新控件，使用此方法必须写 refreshing
                    numColumns ={1} // 指定多少列  等于 1 的时候，不能写 columnWrapperStyle
                    onEndReached={this.loadMore.bind(this)}
                    onEndReachedThreshold={1}
                />

            </View>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginBottom: ConstValue.Tabbar_marginBottom,
    },
});

function mapStateToProps(state) {

    return {

    };

}

function mapDispatchToProps(dispatch) {
    return {

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(caricature);