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
    TouchableOpacity
} from 'react-native';
import PropType from 'prop-types';

export default class imageType extends Component<{}> {

    constructor(props){
        super(props);
    }

    render() {
        const { onClick } = this.props;
        return (
            <View style={styles.container}>

                <TouchableOpacity style={styles.itemStyle} onPress={()=>{
                    onClick(0);
                }}>
                    <Text style={styles.textStyle}>精选</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.itemStyle} onPress={()=>{
                    onClick(34);
                }}>
                    <Text style={styles.textStyle}>大胸妹</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.itemStyle} onPress={()=>{
                    onClick(1);
                }}>
                    <Text style={styles.textStyle}>清纯</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.itemStyle} onPress={()=>{
                    onClick(35);
                }}>
                    <Text style={styles.textStyle}>小清新</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.itemStyle} onPress={()=>{
                    onClick(2);
                }}>
                    <Text style={styles.textStyle}>性感</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.itemStyle} onPress={()=>{
                    onClick(36);
                }}>
                    <Text style={styles.textStyle}>文艺范</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.itemStyle} onPress={()=>{
                    onClick(37);
                }}>
                    <Text style={styles.textStyle}>性感妹</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.itemStyle} onPress={()=>{
                    onClick(3);
                }}>
                    <Text style={styles.textStyle}>气质</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.itemStyle} onPress={()=>{
                    onClick(38);
                }}>
                    <Text style={styles.textStyle}>大长腿</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.itemStyle} onPress={()=>{
                    onClick(39);
                }}>
                    <Text style={styles.textStyle}>黑丝袜</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.itemStyle} onPress={()=>{
                    onClick(4);
                }}>
                    <Text style={styles.textStyle}>唯美</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.itemStyle} onPress={()=>{
                    onClick(40);
                }}>
                    <Text style={styles.textStyle}>小翘臀</Text>
                </TouchableOpacity>

            </View>
        );
    }
}

/*声明属性*/
imageType.propTypes = {
    onClick: PropType.func,
};

/*属性默认值*/
imageType.defaultProps = {
    onClick: ()=>{},
};

const styles = StyleSheet.create({
    container: {
        padding: 5,
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    itemStyle:{
        margin: 5,
        padding: 5,
        borderRadius: 5,
        backgroundColor: 'red'
    },
    textStyle:{
        fontSize: 16,
        color: 'white'
    }
});

