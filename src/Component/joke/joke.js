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
    Clipboard,
} from 'react-native';


import ImageViewer from 'react-native-image-zoom-viewer';
import ToastMessage from '@remobile/react-native-toast';
import JokeRow from './jokeRow';
import * as ConstValue from '../../Const/constValue';
import HttpRequest from '../../utils/httpRequest';
import * as HttpRequestKeys from '../../utils/httpRequestKeys';
import PlayVideo from './playVideo';

const {width, height} = Dimensions.get('window');
let page = 1;
let isLoadData = true;

export default class joke extends Component<{}> {
    constructor(props){
        super(props);

        this.state={
            data: [],
            refreshing: true,
            bigImageUrl: '',
            isShowBigImage: false,
            isPlayVideo: false,
            videoUrl: '',
            cdn_img: ''
        };

        this.renderItem = this.renderItem.bind(this);
        this.loadData = this.loadData.bind(this);
        this.refresh = this.refresh.bind(this);

    }
    componentDidMount() {
        //易源数据->百思不得姐 查询接口
        this.refresh();
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
    /*加载网络数据*/
    loadData(page){
        HttpRequest({
            mode: 'POST',
            url: 'http://route.showapi.com/255-1?showapi_appid='+HttpRequestKeys.Yi_Yuan_App_id+'&showapi_sign='+HttpRequestKeys.Yi_Yuan_App_secret+'&page='+String(page),
            params: null,
            loading: ()=>{
                this.setState({
                    refreshing: true,
                });
                isLoadData = true;
            },
            success: (responseData)=>{

                const showapi_res_code = responseData.showapi_res_body.ret_code;
                const body = responseData.showapi_res_body.pagebean;
                console.log('body', body);


                if (showapi_res_code == 0){
                    this.setState({
                        data: this.state.data.concat(body.contentlist),
                    })
                }
            },
            error: (errorInfo)=>{
                if (page === 1){
                }else
                    page--;            },
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
           <JokeRow item={item}
                    onTextClick={()=>{
                        ToastMessage.showShortCenter('"'+item.text.replace(/(^\s*)|(\s*$)/g, "").substring(0,5)+'...'+'"'+'  '+'复制成功');
                        Clipboard.setString(item.text.replace(/(^\s*)|(\s*$)/g, ""));
                    }}
                    onImageClick={()=>{
                        this.setState({
                            bigImageUrl: item.cdn_img,
                            isShowBigImage: true,
                        })
                    }}
                    onPlayVideoClick={()=>{
                        this.setState({
                            isPlayVideo: true,
                            videoUrl: item.video_uri,
                        })
                    }}
                    onPlayAudioClick={()=>{
                        this.setState({
                            isPlayVideo: true,
                            videoUrl: item.voice_uri,
                            cdn_img: item.profile_image.replace('_mini', '')
                        })
                    }}
           />
        )
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

                {
                    this.state.isPlayVideo ? <PlayVideo onCloseClick={()=>{
                                                            this.setState({
                                                                isPlayVideo: false,
                                                            })
                                                        }}
                                                        videoUrl={{uri: this.state.videoUrl}}
                                                        cdn_img={{uri: this.state.cdn_img}}

                        /> : null
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

