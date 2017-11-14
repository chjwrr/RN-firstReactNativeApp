/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component, PropTypes } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity
} from 'react-native';

class ItemRow extends Component<{}> {

    render(){
        return(
            <TouchableOpacity style={{marginBottom: 30}} onPress={()=>{
                this.props.onClick();
            }}>
                <View style={{backgroundColor: 'white', flexDirection: 'row', justifyContent: 'space-between', padding: 10}}>
                    <Text style={{marginLeft: 10, color: '#333'}}>{this.props.title}</Text>
                    <Text style={{marginRight: 5, color: '#8f8e94', fontSize: 12}}>{this.props.des}</Text>
                </View>
            </TouchableOpacity>
        )
    }
}


export default class menu extends Component<{}> {

    /*声明属性*/
    static propTypes = {

    };

    /*属性默认值*/
    static defaultProps = {

    };
    constructor(props){
        super(props);
    }

    render() {
        return (
            <View style={styles.container}>


                <View>
                    <ItemRow title="精选"
                             des="精益求精"
                             onClick={()=>{
                                this.props.onClick(1);
                            }}/>
                    <ItemRow title="漫画"
                             des="漫无止境"
                             onClick={()=>{
                                 this.props.onClick(2);
                            }}/>
                    <ItemRow title="美图"
                             des="徐徐图之"
                             onClick={()=>{
                                 this.props.onClick(3);
                            }}/>
                    <ItemRow title="壁纸"
                             des="每日一壁"
                             onClick={()=>{
                                 this.props.onClick(4);
                            }}/>
                </View>


            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5FCFF',
        justifyContent: 'center'
    },
});

