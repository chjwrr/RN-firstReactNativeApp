/**
 * Created by chj on 2017/10/20.
 */
import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View
} from 'react-native';
import {StackNavigator} from "react-navigation";

import {StackRouteConfigs, StackNavigatorConfigs} from './navigation/routers';

/*
 navigation 构造函数
 */
const Navigation = StackNavigator(StackRouteConfigs, StackNavigatorConfigs);

export default class MainComponent extends Component {

    render() {
        return (
            <Navigation
                onNavigationStateChange={(prevNav, nav, action)=>{
                    // 每次导航改变时，都会走这个方法，可以再次判断逻辑
                    console.log('prevNav=',prevNav);
                    console.log('nav=',nav);
                    console.log('action=',action);
                }}
            />
        );
    }
}
