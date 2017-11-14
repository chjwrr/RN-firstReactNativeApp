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
import ImageRow from './imageRow';
import ImageType from './imageType';
import HttpRequest from '../../utils/httpRequest';
import * as HttpRequestKeys from '../../utils/httpRequestKeys';
import ImageViewer from 'react-native-image-zoom-viewer';

let page = 1;
let isLoadData = true;
let imageType = 0;
let imageListID = '';

const {width, height} = Dimensions.get('window');

class image extends Component<{}> {

    constructor(props){

        super(props);
        this.state={
            data: [],
            refreshing: true,
            isShowBigImage: false,
            bigImageUrl: []
        };

        this.renderItem = this.renderItem.bind(this);
        this.getTianXingData = this.getTianXingData.bind(this);
        this.loadData = this.loadData.bind(this);
        this.getYiYuanHuaBanFuLiData = this.getYiYuanHuaBanFuLiData.bind(this);
        this.getYiYuanMeiNvTuJiData = this.getYiYuanMeiNvTuJiData.bind(this);
        this.getYiYuanMeiNvTuJiListData = this.getYiYuanMeiNvTuJiListData.bind(this);
    }

    componentDidMount() {

        //1.天行数据->美女图片（一张图片地址，一个图片详情的网页地址）


        // 分类
        //3.易源数据->花瓣福利  查询分类别，返回标题+图片地址+详情网址  一张图   id  34-40
        //4.易源数据->美女图集  图片数组  id  1-4
            //返回图集（类型）
            //根据类型返回多有的图集
            //根据图集的ID 获取图集里面的所有图片集合



        this.refresh();
    }



    /*row*/
    renderItem(item){
        return (
            <ImageRow item={item}
                      onClick={()=>{
                          if (imageType > 0 && imageType < 5){
                              //易源数据->美女图集
                              imageListID = item.key;
                              this.getYiYuanMeiNvTuJiListData();
                          }else {
                              //易源数据->花瓣福利
                              // 天行数据
                             this.setState({
                                 bigImageUrl: [{url: item.imageUrl}],
                                 isShowBigImage: true,
                             });
                          }
                      }}
            />
        )
    }

    /*天行数据-获取网络数据*/
    getTianXingData(){

        HttpRequest({
            mode: 'POST',
            url: 'http://api.tianapi.com/meinv/?key=bee76a2202b7c21dd90c5163cb8b4506&num=20'+'&page='+String(page),
            params: null,
            loading: ()=>{
                isLoadData = true;

            },
            success: (responseData)=>{

                if (responseData.code === 200){

                    let dataSource = responseData.newslist.map((item, index)=>{
                        return {key : item.url, title: item.title, imageUrl: item.picUrl}
                    });

                    this.setState({
                        data: this.state.data.concat(dataSource),
                    })
                }
            },
            error: (errorInfo)=>{

            },
            finish:()=>{
                this.setState({
                    refreshing: false,
                });
                isLoadData = false

            }
        });
    }

    /*易源数据->花瓣福利-获取网络数据*/
    getYiYuanHuaBanFuLiData(){

        HttpRequest({
            mode: 'POST',
            url: 'http://route.showapi.com/819-1?showapi_appid='+HttpRequestKeys.Yi_Yuan_App_id+'&showapi_sign='+HttpRequestKeys.Yi_Yuan_App_secret+'&page='+String(page)+'&type='+String(imageType),
            params: null,
            loading: ()=>{
                isLoadData = true;
            },
            success: (responseData)=>{

                const showapi_res_code = responseData.showapi_res_code;
                const body = responseData.showapi_res_body;
                console.log('body', body);

                if (showapi_res_code == 0){
                    let dataSource = [];
                    for (let i = 0; i < 20; i++){
                        const item = body[String(i)];
                        dataSource.push({key : item.url, title: item.title, imageUrl: item.thumb});
                    }

                    this.setState({
                        data: this.state.data.concat(dataSource),
                    })
                }
            },
            error: (errorInfo)=>{

            },
            finish:()=>{
                this.setState({
                    refreshing: false,
                });
                isLoadData = false

            }
        });
    }

    /*易源数据->美女图集-获取网络数据*/
    getYiYuanMeiNvTuJiData(){

        HttpRequest({
            mode: 'POST',
            url: 'http://route.showapi.com/1208-2?showapi_appid='+HttpRequestKeys.Yi_Yuan_App_id+'&showapi_sign='+HttpRequestKeys.Yi_Yuan_App_secret+'&page='+String(page)+'&type='+String(imageType)+'&rows=20',
            params: null,
            loading: ()=>{
                isLoadData = true;
            },
            success: (responseData)=>{

                const showapi_res_code = responseData.showapi_res_code;
                const body = responseData.showapi_res_body;
                console.log('body', body);

                if (showapi_res_code == 0){
                    let dataSource = body.data.map((item, index)=>{
                        return {key : item.id, title: item.title, imageUrl: item.imgurl, imgCount: item.imgcount}
                    });

                    this.setState({
                        data: this.state.data.concat(dataSource),
                    })
                }
            },
            error: (errorInfo)=>{

            },
            finish:()=>{
                this.setState({
                    refreshing: false,
                });
                isLoadData = false

            }
        });
    }

    /*易源数据->美女图集-获取图片集合-获取网络数据*/
    getYiYuanMeiNvTuJiListData(){

        HttpRequest({
            mode: 'POST',
            url: 'http://route.showapi.com/1208-3?showapi_appid='+HttpRequestKeys.Yi_Yuan_App_id+'&showapi_sign='+HttpRequestKeys.Yi_Yuan_App_secret+'&id='+imageListID,
            params: null,
            loading: ()=>{
                isLoadData = true;
            },
            success: (responseData)=>{

                const showapi_res_code = responseData.showapi_res_code;
                const body = responseData.showapi_res_body;
                console.log('body', body);

                if (showapi_res_code == 0){
                    let dataSource = body.data.map((item, index)=>{
                        return {url: item}
                    });

                    this.setState({
                        bigImageUrl: dataSource,
                        isShowBigImage: true,
                    });
                }

            },
            error: (errorInfo)=>{

            },
            finish:()=>{
                this.setState({
                    refreshing: false,
                });
                isLoadData = false

            }
        });
    }

    /*下拉刷新*/
    refresh(){
        page = 1;
        this.setState({
            data: [],
        },()=>{
           this.loadData();
        })
    }
    /*加载更多*/
    loadMore(){
        if (isLoadData){
        }else {
            page++;
            this.loadData();
        }
        console.log('加载更多');
    }

    /*加载数据*/
    loadData(){
        if (imageType === 0){
            // 天行数据
            this.getTianXingData();
        }else if (imageType < 5){
            //易源数据->美女图集
            this.getYiYuanMeiNvTuJiData();
        }else {
            //易源数据->花瓣福利
            this.getYiYuanHuaBanFuLiData();
        }
    }

    render() {
        const  { showImageType, undo } = this.props;
        return (
            <View style={styles.container}>
                {
                    showImageType ? <ImageType onClick={(index)=>{
                        imageType = index;
                        undo();
                       this.refresh();

                    }}/> : null
                }
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
                                imageUrls={this.state.bigImageUrl}
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

export default connect(mapStateToProps, mapDispatchToProps)(image);