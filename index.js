import './shim.js'
import crypto from 'crypto'
import React, { Component } from 'react';
import { AppRegistry } from 'react-native';
import { Provider } from "react-redux"

import App from './App';
import { name as appName } from './app.json';
import store from './app/redux/store.js';
console.ignoredYellowBox = ['Warning: BackAndroid is deprecated. Please use BackHandler instead.', 'source.uri should not be an empty string', 'Invalid props.style key'];
console.disableYellowBox = true; // 关闭全部黄色警告

const Apps = () => {
    return (
        // 挂载store,让app内部所有组件都可以使用
        <Provider store={store}>
            <App />
        </Provider>
    )
}

AppRegistry.registerComponent(appName, () => Apps);
