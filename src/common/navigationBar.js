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
} from 'react-native';
import PropTypes from 'prop-types'

import *as ConstValue from '../Const/constValue';

import BackImag from '../asset/navigation/navigation_back.png';
import RightImage from '../asset/navigation/navigation_right_nor.png';

export default class navigationBar extends Component<{}> {

    constructor(props){
        super(props);
    }

    render() {
        const {
            navigator,
            title,
            showLeftItem,
            leftItemType,
            leftTitle,
            leftImage,
            showRightItem,
            rightItemType,
            rightTitle,
            rightImage,
            leftAction,
            rightAction,
        } = this.props;
        return (
            <View style={styles.container}>
                <View style={styles.navigationViewStyle}>

                    <View style={{flex: 1, justifyContent: 'flex-end'}}>
                    {
                        (()=>{

                            if (showLeftItem){
                                if (leftItemType === 'text'){
                                    return (
                                        <TouchableOpacity onPress={()=>{
                                            if (leftAction){
                                                leftAction();
                                            }else {
                                                navigator.goBack();
                                            }
                                        }}>
                                            <Text style={{textAlign: 'left', color: 'white'}}>{leftTitle}</Text>
                                        </TouchableOpacity>
                                    )
                                }else {
                                    return (
                                        <TouchableOpacity onPress={()=>{
                                            if (leftAction){
                                                leftAction();
                                            }else {
                                                navigator.goBack();
                                            }
                                        }}>
                                            <Image source={ leftImage ? leftImage : BackImag}/>
                                        </TouchableOpacity>
                                    )
                                }
                            }else
                                return null;
                        })()
                    }
                    </View>


                    <View style={{flex: 2}}>
                        <Text numberOfLines={1} style={{fontSize: 20, color: 'white', textAlign: 'center'}}>{title}</Text>
                    </View>


                    <View style={{flex: 1, justifyContent: 'flex-end', flexDirection: 'row'}}>
                        {
                            (()=>{
                                if (showRightItem){
                                    if (rightItemType === 'text'){
                                        return (
                                            <TouchableOpacity onPress={()=>{
                                                rightAction();
                                            }}>
                                                <View style={{justifyContent: 'flex-end'}}>
                                                    <Text style={{textAlign: 'right', color: 'white'}}>{rightTitle}</Text>
                                                </View>
                                            </TouchableOpacity>
                                        )
                                    }else {
                                        return (
                                            <TouchableOpacity onPress={()=>{
                                                rightAction();
                                            }}>
                                                <View style={{justifyContent: 'flex-end'}}>
                                                    <Image source={rightImage}/>
                                                </View>
                                            </TouchableOpacity>
                                        )
                                    }
                                }else
                                    return null;
                            })()
                        }
                    </View>

                </View>
            </View>
        );
    }
}

/*声明属性*/
navigationBar.propTypes = {
    title: PropTypes.string,
    showLeftItem: PropTypes.bool,
    leftItemType: PropTypes.string,
    leftTitle: PropTypes.string,
    showRightItem: PropTypes.bool,
    rightItemType: PropTypes.string,
    rightTitle: PropTypes.string,
};

/*属性默认值*/
navigationBar.defaultProps = {
    title: '标题',
    showLeftItem: true,
    leftItemType: 'image',
    leftTitle: '返回',
    showRightItem: false,
    rightItemType: 'text',
    rightTitle: '完成',
};
const styles = StyleSheet.create({
    container: {
        backgroundColor: 'red',
        height: ConstValue.NavigationBar_StatusBar_Height,
    },
    navigationViewStyle: {
        flexDirection: 'row',
        marginTop: ConstValue.StatusBar_Height,
        padding: 10
    },

});

