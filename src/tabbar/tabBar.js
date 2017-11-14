/**
 * Created by xizhixin on 2017/9/20.
 * 底部tabBar导航
 */
import React from 'react';
import {
    Image,
    StyleSheet,
    DeviceEventEmitter,
} from 'react-native';

import {
    TabBarBottom,
} from 'react-navigation';

import * as ConstValue from '../Const/constValue';

import Home from '../Component/home/home';
import Mine from '../Component/mine/mine';


const styles = StyleSheet.create({
    tabIcon: {
        resizeMode: 'cover',
        marginTop: 10
    }
});

const TabRouteConfigs = {
    Home: {
        screen: Home,
        navigationOptions: ({navigation, screenProps}) => ({
            title: '首页',
            // tabBarIcon: ({focused, tintColor})=>(
            //     <Image
            //         source={focused ? HomePressedIcon : HomeRenderIcon}
            //         style={styles.tabIcon}
            //     />
            // ),
            tabBarOnPress:(scene, jumpToIndex) => {
                // 在此处理点击tabbar的操作
                jumpToIndex(scene.index)
            },
        }),
    },
    Mine: {
        screen: Mine,
        navigationOptions: ({navigation, screenProps}) => ({
            title: '我的',
            // tabBarIcon: ({focused,tintColor})=>(
            //     <Image
            //         source={focused? CenterPressedIcon : CenterRenderIcon}
            //         style={styles.tabIcon}
            //     />
            // ),
            tabBarOnPress:(scene, jumpToIndex) => {
                jumpToIndex(scene.index)
            },
        }),
    }
};
const TabNavigatorConfigs = {
    initialRouteName: 'Home',
    tabBarComponent: TabBarBottom,
    tabBarPosition: 'bottom',
    swipeEnabled: false,
    animationEnabled: false,
    lazy: true,
    backBehavior: 'none', // 按 back 键是否跳转到第一个Tab(首页)， none 为不跳转
    tabBarOptions: {
        activeTintColor: '#2562b4', // 文字和图片选中颜色
        // inactiveTintColor: '#999999', // 文字和图片默认颜色
        showIcon: true, // android 默认不显示 icon, 需要设置为 true 才会显示
        indicatorStyle: {
            height: 0 // android 中TabBar下面会显示一条线，高度设为 0 后就不显示线了
        },
        style: {
            backgroundColor: '#FFFFFF', // TabBar 背景色
            height:0,
            opacity: 0,
        },
        labelStyle: {
            fontSize: 10,
            marginBottom: ConstValue.Tabbar_marginBottom,
        },
        iconStyle: {
        }
    },
};

export {
    TabRouteConfigs,
    TabNavigatorConfigs
}
