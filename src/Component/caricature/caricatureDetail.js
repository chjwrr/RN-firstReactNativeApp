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
    Image,
    Dimensions,
} from 'react-native';
import {connect} from 'react-redux';
import NavigationBar from '../../common/navigationBar';
import HttpRequest from '../../utils/httpRequest';
import * as HttpRequestKeys from '../../utils/httpRequestKeys';
import ImageViewer from 'react-native-image-zoom-viewer';

const {width, height} = Dimensions.get('window');
import * as ConstValue from '../../Const/constValue';

class caricatureDetail extends Component<{}> {

    constructor(props){
        super(props);

        this.state = {
            data: [],
            isShowBigImage: false,
        };

        this.detail = this.detail.bind(this);
    }

    componentDidMount() {
        this.detail();
    }

    componentWillUnmount() {
        this.setState({
            isShowBigImage: false
        })
    }
    detail(){
        HttpRequest({
            mode: 'POST',
            url: 'http://route.showapi.com/958-2?showapi_appid='+HttpRequestKeys.Yi_Yuan_App_id+'&showapi_sign='+HttpRequestKeys.Yi_Yuan_App_secret+'&id='+this.props.navigation.state.params.itemID,
            params: null,
            loading: ()=>{
            },
            success: (responseData)=>{

                const showapi_res_code = responseData.showapi_res_code;
                const body = responseData.showapi_res_body;
                console.log('958body', body);

                if (showapi_res_code == 0){

                   let dataSource = body.item.imgList.map((item, index)=>{
                        return {url: item}
                   });

                    this.setState({
                        isShowBigImage: true,
                        data: dataSource,
                    })
                }
            },
            error: (errorInfo)=>{

            },
            finish:()=>{
            }
        });
    }


    render() {
        return (
            <View style={styles.container}>
                <NavigationBar title={this.props.navigation.state.params.title}
                               showLeftItem={true}
                               navigator={this.props.navigation}
                />
                {
                    this.state.isShowBigImage ? <View style={styles.bigImageViewStyle}>
                            <ImageViewer
                                imageUrls={this.state.data}
                                index={0} // 默认选中第几张图
                                onClick={()=>{ // 点击
                                    //this.props.navigation.goBack();
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
        backgroundColor: '#F5FCFF',
    },
    bigImageViewStyle:{
        position: 'absolute',
        width,
        height: height - ConstValue.NavigationBar_StatusBar_Height,
        top: ConstValue.NavigationBar_StatusBar_Height
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

export default connect(mapStateToProps, mapDispatchToProps)(caricatureDetail);