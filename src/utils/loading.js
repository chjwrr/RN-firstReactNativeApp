/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component, PropTypes } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Animated,
    Dimensions,
} from 'react-native';

const {width, height} = Dimensions.get('window');

export default class loading extends Component {

    /*声明属性*/
    static propTypes = {
        color: PropTypes.string,
    };

    /*属性默认值*/
    static defaultProps = {
        color: '#1B82D1',
    };

    constructor(props){
        super(props);
        this.springValue1 = new Animated.Value(0);
        this.springValue2 = new Animated.Value(0);
        this.springValue3 = new Animated.Value(0);


        this.loadAnimation = this.loadAnimation.bind(this);
    }

    componentDidMount() {
        this.loadAnimation(this.springValue1);
        setTimeout(()=>{
            this.loadAnimation(this.springValue2);
        }, 200);
        setTimeout(()=>{
            this.loadAnimation(this.springValue3);
        }, 400);

    }

    loadAnimation(springValue){

        Animated.sequence([
            Animated.timing(
                springValue,
                {
                    toValue: 1,
                    friction: 1,
                    duration: 600,
                }
            ),
            Animated.timing(
                springValue,
                {
                    toValue: 0.5,
                    friction: 1,
                    duration: 600,
                }
            )
        ]).start(()=>{this.loadAnimation(springValue)});
    }


    render() {
        const {color} = this.props;
        return (
            <View style={[styles.container]}>
                <View style={styles.centerViewStyle}>

                    <Animated.View style={
                        [
                            styles.pointStyle,
                            {backgroundColor: color, transform: [{scale: this.springValue1}]}
                            ]
                    } />
                    <Animated.View style={
                        [
                            styles.pointStyle,
                            {backgroundColor: color, transform: [{scale: this.springValue2}]}
                            ]
                    } />
                    <Animated.View style={
                        [
                            styles.pointStyle,
                            {backgroundColor: color, transform: [{scale: this.springValue3}]}
                            ]
                    } />

                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: width,
        height: height,
        position: 'absolute'
    },
    centerViewStyle: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row'
    },
    pointStyle: {
        width: 20,
        height: 20,
        borderRadius: 10,
        marginLeft: 5,
        transform: [{scale: this.springValue1}]
    },
});

