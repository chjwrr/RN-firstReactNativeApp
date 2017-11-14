/**
 * Created by chj on 2017/10/20.
 */

import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Animated,
    Easing,
    Dimensions,
    LayoutAnimation,
    Modal,
    Image
} from 'react-native';

import NavigationBar from '../../common/navigationBar';
import * as ConstValue from '../../Const/constValue';
import Menu from '../menu/menu';
import Joke from '../joke/joke';
import Image_beautiful from '../image/image';
import Wallpaper from '../wallpaper/wallpaper';
import Caricature from '../caricature/caricature';
import image_LeftImage from '../../asset/image/image_search.png';
import image_rightImage from '../../asset/image/image_more.png';
import image_menu from '../../asset/menu/menu_menu.png';
import Store from '../../utils/storage';



import EmptyView from '../../utils/emptyView';


const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;
const leftWidth = screenWidth - 100;
const leftSpace = 100;
const duration = 250;
const iconWH = 50;

export default class Home extends Component<{}> {

    constructor(props) {
        super(props);

        this.marginLeftValue = new Animated.Value(0); // 左侧向右动画初始值，默认为0
        this.fadeInAnimated = new Animated.Value(0); // 渐隐动画初始值，默认为0，透明


        this.state = {
            isShowModal: false,
            iconX: 0,
            iconY: ConstValue.NavigationBar_StatusBar_Height,
            isMove: false,
            menuType: 3,
            showImageType: false
        };

        this.showModalByFadeIn = this.showModalByFadeIn.bind(this);
        this.hideModalByFadeIn = this.hideModalByFadeIn.bind(this);
        this.moveView = this.moveView.bind(this);
        this.modalView = this.modalView.bind(this);
    }

    componentDidMount() {
        Store.get('iconX').then((iconX)=>{
            this.setState({iconX});
        });
        Store.get('iconY').then((iconY)=>{
            this.setState({iconY});
        });

    }

    /*显示浮层*/
    showModalByFadeIn() {
        this.setState({
            isShowModal: true
        }, () => {
            this.marginLeftValue.setValue(0);
            // 组动画，组内动画同时执行
            Animated.parallel([
                // 从左向右的动画效果
                Animated.timing(
                    this.marginLeftValue,
                    {
                        toValue: 1,
                        duration: duration,
                        easing: Easing.linear
                    }
                ),
                // 透明度变化的动画效果
                Animated.timing(
                    this.fadeInAnimated, {
                        toValue: 0.7, // 1为不透明
                        duration: duration,
                        easing: Easing.linear
                    }
                )]
            ).start()
        });

    }

    /*隐藏浮层*/
    hideModalByFadeIn() {
        Animated.parallel([
            Animated.timing(
                this.marginLeftValue,
                {
                    toValue: 0,
                    duration: duration,
                    easing: Easing.linear
                }
            ),
            Animated.timing(
                this.fadeInAnimated, {
                    toValue: 0, // 1为不透明
                    duration: duration,
                    easing: Easing.linear
                }
            )
        ]).start(() => {
            this.setState({
                isShowModal: false
            })
        });

    }

    moveView(){
        let opacityStyle = this.state.isMove ? {opacity: 1.0} : {opacity: 0.3};

        let iconStyle = {
            left: this.state.iconX,
            top: this.state.iconY,
        };
        return (
            <View style={[{
                    width: iconWH,
                    height: iconWH,
                    position: 'absolute',
                }, iconStyle]}
                  onStartShouldSetResponder={() => true}
                  onMoveShouldSetResponder= {() => true}
                  onResponderGrant= {() => {
                        this.setState({
                            isMove: true,
                        });
                    }}
                  onResponderMove= {(evt) => {

                        if (evt.nativeEvent.pageX >= iconWH / 2 &&
                        evt.nativeEvent.pageX <=screenWidth - iconWH / 2 &&
                        evt.nativeEvent.pageY >= ConstValue.NavigationBar_StatusBar_Height + iconWH / 2 &&
                        evt.nativeEvent.pageY <= screenHeight - iconWH / 2 - ConstValue.Tabbar_marginBottom){
                            this.setState({
                                iconX: evt.nativeEvent.pageX - iconWH / 2,
                                iconY: evt.nativeEvent.pageY - iconWH / 2
                            })
                        }
                    }}
                  onResponderRelease= {() => {
                        this.setState({
                            isMove: false,
                        }, ()=>{
                            Store.save('iconX', String(this.state.iconX));
                            Store.save('iconY', String(this.state.iconY));
                        });


                    }}
            >
                <TouchableOpacity style={{
                            height: iconWH,
                            width: iconWH,
                            position: 'absolute',
                            justifyContent: 'center'
                    }} onPress={()=>{
                        this.showModalByFadeIn();
                    }}>
                    <View style={[{
                            height: iconWH,
                            width: iconWH,
                            backgroundColor: 'black',
                            borderRadius: iconWH / 2,
                            position: 'absolute',
                        }, opacityStyle]}>

                    </View>

                    <Image style={{marginLeft: 10}} source={image_menu}/>

                </TouchableOpacity>

            </View>

        )
    }

    modalView(){

        const movingMargin = this.marginLeftValue.interpolate({
            inputRange: [0, 1],
            outputRange: [-leftWidth, 0]
        });
        return(
            <Modal style={styles.modalStyle}
                   visible={this.state.isShowModal}
                   transparent={true}
                   animationType='fade'
            >

                <View style={{marginTop: 0,
                                marginLeft: 0,
                                width: screenWidth,
                                height: screenHeight,
                                flexDirection: 'row',

                        }}>
                    {/*动画View*/}
                    <Animated.View style={{marginTop: 0,
                                    marginLeft: movingMargin,
                                    width: leftWidth,
                                    height: screenHeight,
                                    backgroundColor: 'white',
                            }}>

                        <Menu onClick={(type)=>{
                            this.setState({
                                menuType: type
                            });
                            this.hideModalByFadeIn();
                                //this.props.navigation.navigate('Mine');
                        }}/>

                    </Animated.View>

                    {/*右侧点击按钮*/}
                    <TouchableOpacity style={styles.rightStyle}
                                      onPress={()=>{
                                              this.hideModalByFadeIn();
                                          }}
                                      activeOpacity={1}
                    />

                </View>
            </Modal>

        )
    }

    render() {

        return (
            <View style={styles.container}>

                {this.state.menuType === 3 ? <NavigationBar title='美图'
                                                            showLeftItem={true}
                                                            navigator={this.props.navigation}
                                                            leftItemType='image'
                                                            leftImage={image_LeftImage}
                                                            showRightItem={true}
                                                            rightItemType="image"
                                                            rightImage={image_rightImage}
                                                            leftAction={()=>{
                                                                this.props.navigation.navigate('ImageSearch');
                                                            }}
                                                            rightAction={()=>{
                                                                console.log('更多');
                                                                this.setState({
                                                                    showImageType: !this.state.showImageType
                                                                })
                                                            }}


                    /> :
                    <NavigationBar title={this.state.menuType === 1 ?  '精选' :
                           this.state.menuType === 2 ?  '漫画' :
                                   this.state.menuType === 3 ?  '美图' :
                                       '壁纸'}
                                   showLeftItem={false}
                                   navigator={this.props.navigation}

                    />}

                {
                   this.state.menuType === 1 ?  <Joke navigator={this.props.navigation}/> :
                           this.state.menuType === 2 ?  <Caricature navigator={this.props.navigation}/> :
                                   this.state.menuType === 3 ?  <Image_beautiful navigator={this.props.navigation}
                                                                                 showImageType={this.state.showImageType}
                                                                                 undo={()=>{
                                                                                     this.setState({
                                                                                         showImageType: false
                                                                                     })
                                                                                 }}
                                       /> :
                                       <Wallpaper navigator={this.props.navigation}/>
                }

                {
                    this.moveView()
                }

                {
                    // 中间的黑色渐变View
                    (() => {
                        if (this.state.isShowModal) {
                            return (
                                <Animated.View style={[styles.modalStyle,
                                    {backgroundColor: 'black',
                                    width: screenWidth,
                                    height: screenHeight,
                                    position: 'absolute',
                                    opacity: this.fadeInAnimated}]}>
                                </Animated.View>
                            )
                        }
                    })()
                }

                {
                    this.modalView()
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
    textStyle: {
        marginTop: 200,
        marginLeft: 100,
        textAlign: 'center',
        backgroundColor: 'red',
        height: 44,
        lineHeight: 44
    },
    modalStyle: {
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
    },
    downViewStyle: {
        height: 50,
        marginHorizontal: 0,
        backgroundColor: 'green',
        marginTop: screenHeight - 50,
        alignItems: 'center',
    },
    rightStyle: {
        marginTop: 0,
        marginRight: 0,
        width: leftSpace,
        height: screenHeight,
    },
});
