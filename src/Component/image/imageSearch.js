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
    Dimensions,
    TextInput,
    Image
} from 'react-native';
import {connect} from 'react-redux';
import * as ConstValue from '../../Const/constValue';
import ImageRow from './imageRow';
import ImageSearch from '../../asset/image/image_search_search.png';
import ImageSearchClose from '../../asset/image/image_seach_close.png';
import HttpRequest from '../../utils/httpRequest';

const {width, height} = Dimensions.get('window');

class imageSearch extends Component<{}> {

    constructor(props){

        super(props);
        this.state={
            data: [],
            textValue: '',
        };

        this.renderItem = this.renderItem.bind(this);
        this.getDTData = this.getDTData.bind(this);
    }
    componentDidMount() {

        // 搜索
        //6.DT阿凡达数据->图片搜索
        //输入关键字，返回图片集合

        this.getDTData('美女')
    }

    /*DT阿凡达数据-获取网络数据*/
    getDTData(word){

        HttpRequest({
            mode: 'POST',
            url: 'http://api.avatardata.cn/Image/Search?key=1e1cf214fad14bb5bce472cac1bb1f95&rows=30&keyword=' + word ,
            params: null,
            loading: ()=>{

            },
            success: (responseData)=>{
                // this.setState({
                //     data: [
                //         {key: '1', imageUrl: 'text', title: '这就是标题，有什么意见吗'},
                //         {key: '2', imageUrl: 'text', title: '这就是标题，没有意见'},
                //     ],
                // })

            },
            error: (errorInfo)=>{

            },
            finish:()=>{

            }
        });
    }

    /*row*/
    renderItem(item){
        return (
            <ImageRow item={item}
                      onClick={()=>{

                      }}
                      isHasText={true}
            />
        )
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.topViewStyle}>

                    <View style={styles.topCenterViewStyle}>
                        <View style={{
                            width: width - 90,
                            height: 30,
                            marginLeft: 10,
                            backgroundColor: 'white',
                            borderRadius: 5,
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                        }}>

                            <View style={{marginLeft: 8, flexDirection: 'row'}}>
                                <Image style={{marginVertical: 8}} source={ImageSearch}/>
                                <TextInput ref={(input)=>this.input = input}
                                           style={{width: 200, marginLeft: 8}}
                                           value={this.state.textValue}
                                           onChange={(textValue)=>{
                                               this.setState({textValue});
                                           }}
                                           returnKeyType='done'
                                           onEndEditing={()=>{
                                               // 调用搜索接口
                                               this.getDTData(this.state.textValue);
                                           }}
                                />
                            </View>
                            <TouchableOpacity onPress={()=>{
                                this.input.clear();
                            }}>
                                <Image style={{marginTop: 8, marginRight: 8}} source={ImageSearchClose}/>
                            </TouchableOpacity>
                        </View>

                        <View style={{
                            width: 60,
                            marginHorizontal: 10,
                            justifyContent: 'center',
                        }}>
                            <TouchableOpacity onPress={()=>{
                                this.props.navigation.goBack();
                            }}>
                                <Text style={{
                                textAlign: 'center',
                                color: 'white',
                                fontSize: 17
                            }}>取消</Text>
                            </TouchableOpacity>
                        </View>

                    </View>
                </View>


                <FlatList
                    ref="flatList"
                    data={this.state.data} // 数据
                    renderItem={({item}) => this.renderItem(item)} // row
                    horizontal={false} // 水平还是垂直
                    numColumns ={1} // 指定多少列  等于 1 的时候，不能写 columnWrapperStyle
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
    topViewStyle:{
        height: ConstValue.NavigationBar_StatusBar_Height,
        backgroundColor: 'red',
    },
    topCenterViewStyle:{
        marginTop: ConstValue.StatusBar_Height,
        flexDirection: 'row',
        justifyContent: 'space-between',
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

export default connect(mapStateToProps, mapDispatchToProps)(imageSearch);