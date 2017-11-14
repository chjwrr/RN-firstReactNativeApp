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
    Dimensions,
    Image,
} from 'react-native';
import PropType from 'prop-types';
import Video from 'react-native-video';
import CloseImg from '../../asset/joke/joke_close.png';
import * as ConstValue from '../../Const/constValue';

const { width, height } = Dimensions.get('window');

export default class playVideo extends Component<{}> {

    constructor(props){
        super(props);
    }

    render() {
        const { onCloseClick, videoUrl, cdn_img } = this.props;

        return (
            <View style={styles.container}>

                {
                    videoUrl.uri.endsWith('mp3') ? <Image style={styles.backgroundVideo} source={cdn_img} /> :
                        <Video
                            source={videoUrl} // 视频的URL地址，或者本地地址，都可以.
                            //source={require('./music.mp3')} // 还可以播放音频，和视频一样
                            //source={{uri:'http://......'}}
                            ref='player'
                            rate={1}                   // 控制暂停/播放，0 代表暂停paused, 1代表播放normal.
                            volume={1.0}                 // 声音的放声音的放大倍数大倍数，0 代表没有声音，就是静音muted, 1 代表正常音量 normal，更大的数字表示放大的倍数
                            muted={false}                // true代表静音，默认为false.
                            paused={false}               // true代表暂停，默认为false
                            resizeMode="contain"           // 视频的自适应伸缩铺放行为，contain、stretch、cover
                            repeat={false}                // 是否重复播放
                            playInBackground={false}     // 当app转到后台运行的时候，播放是否暂停
                            playWhenInactive={false}     // [iOS] Video continues to play when control or notification center are shown. 仅适用于IOS
                            onLoadStart={()=>{}} // 当视频开始加载时的回调函数
                            onLoad={()=>{}}    // 当视频加载完毕时的回调函数
                            onProgress={()=>{}}    //  进度控制，每250ms调用一次，以获取视频播放的进度
                            onEnd={()=>{}}           // 当视频播放完毕后的回调函数
                            onError={()=>{}}    // 当视频不能加载，或出错后的回调函数
                            style={styles.backgroundVideo}
                        />

                }
                <View style={{padding: 20, width: 60, height: 60, position: 'absolute', right: 0}}>
                    <TouchableOpacity onPress={()=>{
                        onCloseClick();
                    }}>
                        <Image source={CloseImg}/>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}

/*声明属性*/
playVideo.propTypes = {
    onCloseClick: PropType.func,
    videoUrl: PropType.object.isRequired,
    cdn_img: PropType.object,
};

/*属性默认值*/
playVideo.defaultProps = {
    onCloseClick: ()=>{},
    videoUrl: '',
    cdn_img: '',
};

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        left: 0,
        top : 0,
        width,
        height,
    },
    bgView: {
        backgroundColor: 'black',
        opacity: 0.5,
        width,
        height,
        position: 'absolute',
    },
    backgroundVideo: {
        width,
        height: height - ConstValue.NavigationBar_StatusBar_Height - ConstValue.Tabbar_marginBottom,
    },
});

