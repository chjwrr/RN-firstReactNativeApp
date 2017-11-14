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
    Dimensions
} from 'react-native';
import PropType from 'prop-types';

const { width, height } = Dimensions.get('window');

const imageHeight = width * 768 / 1366;
export default class wallpaperRow extends Component<{}> {

    constructor(props){
        super(props);
    }

    render() {
        return (
            <View style={styles.container}>
                <TouchableOpacity activeOpacity={0.7} style={{marginVertical: 5}} onPress={()=>{
                    this.props.onClick();
                }}>
                    <View style={{padding: 10, justifyContent: 'center'}}>
                        <Text style={{fontSize: 16, textAlign: 'center'}}>{this.props.item.title}</Text>
                        <Text style={{fontSize: 14, marginTop: 10, textAlign: 'center'}}>{this.props.item.subtitle}</Text>
                    </View>
                    <Image
                        resizeMode='contain'
                        style={{width, height: imageHeight, backgroundColor: '#f5f5f5'}}
                        source={{uri: this.props.item.img_1366}}/>

                    <View style={{padding: 10}}>
                        <Text style={{fontSize: 14, lineHeight: 25}}>{this.props.item.description}</Text>
                    </View>
                </TouchableOpacity>
            </View>
        );
    }
}

/*声明属性*/
wallpaperRow.propTypes = {
    item: PropType.object.isRequired,
    onClick: PropType.func.isRequired,
};

/*属性默认值*/
wallpaperRow.defaultProps = {
    item: {},
    onClick: ()=>{},
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5FCFF',
    }
});

