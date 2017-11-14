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

const {width, height} = Dimensions.get('window');

export default class caricatureRow extends Component<{}> {

    constructor(props){
        super(props);
    }

    render() {
        const { item, onClick } = this.props;
        return (
            <View style={styles.container}>
                {
                    item.thumbnailList ? <TouchableOpacity onPress={()=>{
                        onClick();
                    }}>
                            <View style={{flexDirection: 'row', backgroundColor: 'white'}}>
                                <Image resizeMode='contain'
                                       style={{width: 80, height: 80}}
                                       source={{uri: item.thumbnailList[0]}}
                                />
                                <View style={{width: width - 80, justifyContent: 'center', padding: 10}}>
                                    <Text style={{lineHeight: 20, fontSize: 15}}>{item.title}</Text>
                                </View>
                            </View>
                        </TouchableOpacity> : <TouchableOpacity onPress={()=>{
                            onClick();
                        }}>
                            <View>
                                <View style={{justifyContent: 'center', padding: 10, backgroundColor: 'white'}}>
                                    <Text style={{lineHeight: 20, fontSize: 15}}>{item.title}</Text>
                                </View>
                            </View>
                        </TouchableOpacity>
                }

            </View>
        );
    }
}

/*声明属性*/
caricatureRow.propTypes = {
    item: PropType.object.isRequired,
    onClick: PropType.func,
};

/*属性默认值*/
caricatureRow.defaultProps = {
    item: {},
    onClick: ()=>{},
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5FCFF',
        marginTop: 5,
        marginBottom: 5
    },
});

