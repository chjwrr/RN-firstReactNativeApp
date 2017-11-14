/**
 * Created by chj on 2017/10/20.
 */


import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
} from 'react-native';

export default class Mine extends Component<{}> {

    constructor(props){
        super(props);
    }

    render() {
        return (
            <View style={styles.container}>

                <Text style={styles.instructions}>456</Text>

            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    },
});
