/**
 * Created by xizhixin on 2017/8/24.
 * 界面路由栈
 */
import React from 'react';

import {
    TabNavigator,
    StackNavigator,
} from 'react-navigation';
import {TabRouteConfigs, TabNavigatorConfigs} from '../tabbar/tabBar';

const TabBarNavigator = TabNavigator(TabRouteConfigs, TabNavigatorConfigs);

import Home from '../Component/home/home';
import CaricatureDetail from '../Component/caricature/caricatureDetail';
import ImageSearch from '../Component/image/imageSearch';

const StackRouteConfigs = {
    TabBar: {
        screen: TabBarNavigator,
        navigationOptions: {
            header: null
        }
    },
    CaricatureDetail: {
        screen: CaricatureDetail,
        navigationOptions: {
            header: null
        }
    },
    ImageSearch: {
        screen: ImageSearch,
        navigationOptions: {
            header: null
        }
    },
};
const StackNavigatorConfigs = {
    initialRouteName: 'TabBar', // 初始化哪个界面为根界面
    mode: 'card', // 跳转方式：默认的card，在iOS上是从右到左跳转，在Android上是从下到上，都是使用原生系统的默认跳转方式。
    headerMode: 'screen', // 导航条动画效果：float表示会渐变，类似于iOS的原生效果，screen表示没有渐变。none表示隐藏导航条
    gesturesEnabled: false,
};

export {
    StackRouteConfigs,
    StackNavigatorConfigs
};
