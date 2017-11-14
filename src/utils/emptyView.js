import React, {Component, PropTypes} from 'react';
import {
    View,
    Text,
    StyleSheet,
    Image,
    Dimensions,
    Platform,
} from 'react-native';

import EmptyImage from '../asset/empty/nodata.png';

const {width, height} = Dimensions.get('window');

const styles = StyleSheet.create({
    container: {
        width: width,
        height: height,
        left: 0,
        top: 0,
        // ...Platform.select({
        //     ios: {
        //         top: ConstValue.NavigationBar_StatusBar_Height,
        //     },
        //     android: {
        //         top: 50,
        //     },
        // }),
        alignItems: 'center',
        backgroundColor: '#f5f5f5',
        position: 'absolute',
        flex: 1,
    },
    content: {
        fontSize: 17,
        color: '#ccc',
        textAlign: 'center',
        marginTop: 10,
    },
    subViewStyle: {
        marginVertical: height / 4,
    },
});

class EmptyView extends Component {

    /*声明属性*/
    static propTypes = {
        emptyImage : PropTypes,
        content: PropTypes,
        comment: PropTypes,
    };

    /*属性默认值*/
    static defaultProps = {
        emptyImage: EmptyImage,
        content: '暂无数据',
        comment: null,
    };

    render() {
        const {emptyImage, content, comment} = this.props;
        return (
            <View style={styles.container}>
                <View style={styles.subViewStyle}>
                    <Image source={emptyImage} />
                    <Text style={styles.content}>{content}</Text>

                    {
                        comment ? <View>{comment}</View> : null

                    }

                </View>
            </View>
        );
    }
}

export default EmptyView;
