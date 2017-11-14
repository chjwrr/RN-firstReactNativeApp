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
import PropTypes from 'prop-types';

import VideoPlay from '../../asset/joke/video_play.png';
import AudioPlay from '../../asset/joke/audio_play.png';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;
const imageHeight = screenWidth * 1 / 1;

/*
*
 create_time:"2017-11-06 15:00:13"
 ct:"2017-11-06 15:00:13.825"
 hate:"31"
 height:"0"
 id:"26758072"
 love:"196"
 name:"清风拂江南"
 profile_image:"http://wimg.spriteapp.cn/profile/large/2017/08/08/59898866e9142_mini.jpg"
 text:"↵        如何正确的使用避孕...不是安全套！↵    "
 type:"41"
 video_uri:"http://mvideo.spriteapp.cn/video/2017/1105/59ff2138dc232cutblack_wpc.mp4"
 videotime:"0"
 voicelength:"0"
 voicetime:"0"
 voiceuri:""
 weixin_url:"http://m.budejie.com/detail-26758072.html/"
 width:"0"
 _id:"5a00087d6e3630b3c33b50d7"
* */


/*
 名称	类型	示例值	描述
 pagebean	PageBean		分页对象
 - contentlist	Item[]		条目列表
 -- create_time	String		创建时间
 -- love	String		点赞的数量
 -- hate	String		点踩的数量
 -- height	String		图片高度
 -- width	String		图片宽度
 -- id	String		图片id
 -- image0	String		0号图，数字越大，尺寸越大
 -- image1	String		1号图
 -- image2	String		2号图
 -- image3	String		3号图
 -- text	String		段子正文
 -- type	String		类型    type=10 图片   type=29 段子   type=31 声音    type=41 视频
 -- videotime	String		视频时长
 -- video_uri	String		视频url
 -- voicelength	String		声音文件大小
 -- voicetime	String		声音时长
 -- voiceuri	String		声音url
 -- weixin_url	String		微信链接地址
 -- profile_image	String		用户头像
 - maxResult	String		每页最大数量
 - allNum	String		所有数量
 - allPages	String		所有页
 - currentPage	String		当前页
 ret_code	String	0	0为成功，其他失败
 */

export default class common extends Component<{}> {

    constructor(props){
        super(props);
    }

    render() {
        const { item, onTextClick, onImageClick, onPlayVideoClick, onPlayAudioClick } = this.props;
        return (
            <View style={styles.container}>
                {
                    item.text ?  <TouchableOpacity activeOpacity={0.5} onLongPress={()=>{
                        onTextClick();
                    }}>
                        <View style={{backgroundColor: 'white', padding: 10, marginTop: 1}}>
                             <Text style={{lineHeight: 30, fontSize: 15}}>
                                  {item.text.replace(/(^\s*)|(\s*$)/g, "")}
                             </Text>
                        </View>
                    </TouchableOpacity> : null
                }

                {
                    item.type === '10' ? <TouchableOpacity activeOpacity={0.7} onPress={()=>{
                        onImageClick();
                    }}>
                            <Image style={{
                                marginTop: 1,
                                width : screenWidth,
                                height: screenWidth * 4 / 3,
                                backgroundColor: '#f5f5f5'
                            }} source={{uri: this.props.item.cdn_img}} resizeMode='contain'/>
                    </TouchableOpacity> :
                        item.type === '41' ? <TouchableOpacity onPress={()=>{
                            onPlayVideoClick()
                        }}
                                                               style={{justifyContent: 'center', flex: 1, height: imageHeight}}>
                                <Image style={{
                                    marginTop: 1,
                                    width : screenWidth,
                                    height: imageHeight,
                                    backgroundColor: '#f5f5f5',
                                    position: 'absolute',
                                    top: 0,
                                    left: 0,
                                }} source={{uri : this.props.item.profile_image.replace('_mini', '')}} resizeMode='contain'/>

                                <View style={{
                                    width : screenWidth,
                                    height: imageHeight,
                                    backgroundColor: 'black',
                                    position: 'absolute',
                                    top: 0,
                                    left: 0,
                                    opacity: 0.1
                                }}/>

                                <Image style={{marginLeft: (screenWidth - 20) / 2}} source={VideoPlay}/>

                                <Text style={{position: 'absolute', right: 10, bottom: 10, backgroundColor: 'transparent'}}>12:12</Text>

                            </TouchableOpacity> :
                            item.type === '31' ? <TouchableOpacity onPress={()=>{
                                onPlayAudioClick();
                            }}
                                                                   style={{justifyContent: 'center', flex: 1, height: imageHeight}}>
                                    <Image style={{
                                        marginTop: 1,
                                        width : screenWidth,
                                        height: imageHeight,
                                        backgroundColor: '#f5f5f5',
                                        position: 'absolute',
                                        top: 0,
                                        left: 0,
                                    }} source={{uri : this.props.item.profile_image.replace('_mini', '')}} resizeMode='contain'/>

                                    <View style={{
                                        width : screenWidth,
                                        height: imageHeight,
                                        backgroundColor: 'black',
                                        position: 'absolute',
                                        top: 0,
                                        left: 0,
                                        opacity: 0.1
                                    }}/>

                                    <Image style={{marginLeft: (screenWidth - 20) / 2, marginTop: imageHeight - 40}} source={AudioPlay}/>
                                </TouchableOpacity> : null
                }
            </View>
        );
    }
}

/*声明属性*/
common.propTypes = {
    item: PropTypes.object.isRequired,
    onTextClick: PropTypes.func,
    onImageClick: PropTypes.func,
    onPlayVideoClick: PropTypes.func,
    onPlayAudioClick: PropTypes.func,
};

/*属性默认值*/
common.defaultProps = {
    item: {},
    onTextClick: ()=>{},
    onImageClick: ()=>{},
    onPlayVideoClick: ()=>{},
    onPlayAudioClick: ()=>{},
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5FCFF',
        marginTop: 10,
    },
});

