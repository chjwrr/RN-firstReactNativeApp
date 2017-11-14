import { AppRegistry } from 'react-native';
import Root from './src/root';

//AppRegistry.registerComponent('RNAppModel', () => App);



import React, {Component} from 'react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';

import reducer from './src/reduces/rootDeduces';


const store = createStore(reducer);

export default class RNAppModel extends Component {

    // Provider 包裹住 项目，则项目里面所有的 js 都可以访问到 store

    render() {
        return (
            <Provider store={store}>
                <Root />
            </Provider>
        );
    }
}

AppRegistry.registerComponent('RNAppModel', () => RNAppModel);