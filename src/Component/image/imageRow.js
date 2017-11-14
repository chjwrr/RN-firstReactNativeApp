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
    Dimensions,
} from 'react-native';
import PropType from 'prop-types';

const { width } = Dimensions.get('window');
const imageHeight = 200;

export default class imageRow extends Component<{}> {

    constructor(props){
        super(props);
    }

    render() {
        const { item } = this.props;

        return (
            <View style={styles.container}>
                <TouchableOpacity activeOpacity={0.7} style={{marginVertical: 5}} onPress={()=>{
                    this.props.onClick();
                }}>
                    <Image resizeMode='contain'
                           style={{width, height: imageHeight, backgroundColor: '#f5f5f5'}}
                           source={{uri: item.imageUrl}}
                    />

                    {
                        this.props.isHasText ?  <View style={{position: 'absolute', width, height: 44, bottom: 0,}}>
                                <View style={{ backgroundColor: '#cccccc', height: 44, opacity: 0.5, justifyContent: 'center'}}>
                                    <Text style={styles.textStyle}>
                                        {
                                            item.imgCount ? item.title + '  ' + '(' + item.imgCount + ')' : item.title
                                        }
                                    </Text>
                                </View>
                        </View> : null
                    }

                </TouchableOpacity>
            </View>
        );
    }
}

/*声明属性*/
imageRow.propTypes = {
    item: PropType.object.isRequired,
    onClick: PropType.func.isRequired,
    isHasText: PropType.bool,
};

/*属性默认值*/
imageRow.defaultProps = {
    item: {},
    onClick: ()=>{},
    isHasText: true,
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5FCFF',
    },
    textStyle:{
        textAlign: 'center',
        color: 'black',
        fontSize: 17
    },
});

