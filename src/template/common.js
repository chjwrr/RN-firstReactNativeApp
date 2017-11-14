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

export default class common extends Component<{}> {

    constructor(props){
        super(props);
    }

    render() {
        return (
            <View style={styles.container}>


            </View>
        );
    }
}

/*声明属性*/
common.propTypes = {

};

/*属性默认值*/
common.defaultProps = {

};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5FCFF',
    },
});

