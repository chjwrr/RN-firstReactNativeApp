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
import * as ConstValue from '../../Const/constValue';
import WallpaperRow from './wallpaperRow';
import HttpRequest from '../../utils/httpRequest';
import * as HttpRequestKeys from '../../utils/httpRequestKeys';
import ImageViewer from 'react-native-image-zoom-viewer';

const {width, height} = Dimensions.get('window');
class wallpaper extends Component<{}> {

    constructor(props){

        super(props);
        this.state={
            data: [],
            refreshing: false,
            isShowBigImage: false,
            bigImageUrl: ''
        };

        this.renderItem = this.renderItem.bind(this);
    }
    componentDidMount() {

        // 1.易源数据->必应每日壁纸
        // 一天只会返回一张壁纸，标题+介绍
        // http://route.showapi.com/1287-1

        HttpRequest({
            mode: 'POST',
            url: 'http://route.showapi.com/1287-1?showapi_appid='+HttpRequestKeys.Yi_Yuan_App_id+'&showapi_sign='+HttpRequestKeys.Yi_Yuan_App_secret,
            params: null,
            loading: ()=>{

            },
            success: (responseData)=>{
                console.log(responseData.showapi_res_body);

                const ret_message = responseData.showapi_res_body.ret_message;
                const body = responseData.showapi_res_body.data;

                if (ret_message === 'Success'){
                    this.setState({
                        data: [
                            {
                                key: '1',
                                img_1920: body.img_1920,
                                img_1366: body.img_1366,
                                title: body.title,
                                subtitle: body.subtitle,
                                description: body.description
                            },
                        ],
                    })
                }

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
            <WallpaperRow item={item}
                      onClick={()=>{
                          this.setState({
                              bigImageUrl: item.img_1920,
                              isShowBigImage: true
                          })
                      }}
            />
        )
    }


    render() {
        return (
            <View style={styles.container}>
                <FlatList
                    ref="flatList"
                    data={this.state.data} // 数据
                    renderItem={({item}) => this.renderItem(item)} // row
                    horizontal={false} // 水平还是垂直
                    refreshing={false} // 是否刷新 ，自带刷新控件
                />
                {
                    this.state.isShowBigImage ? <View style={styles.bigImageViewStyle}>
                            <ImageViewer
                                imageUrls={[{url: this.state.bigImageUrl}]}
                                index={0} // 默认选中第几张图
                                onClick={()=>{ // 点击
                                    this.setState({
                                        isShowBigImage: false
                                    })
                                }}
                            />
                        </View> : null
                }
            </View>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginBottom: ConstValue.Tabbar_marginBottom,
    },
    bigImageViewStyle:{
        position: 'absolute',
        width,
        height,
        top: - ConstValue.NavigationBar_StatusBar_Height
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

export default connect(mapStateToProps, mapDispatchToProps)(wallpaper);