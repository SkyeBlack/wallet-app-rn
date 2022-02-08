import React, { Component } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import TabNavigator from 'react-native-tab-navigator';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import WalletHome from "../components/wallet/index";
import { Dapp } from "../components/dapp/index";
import { Settings } from "../components/settings/index";
import I18n from '../i18n/i18n'

const dataSource = [
    {
        icon: require('../images/wallet.png'),
        selectedIcon: require('../images/wallet-active.png'),
        tabPage: 'wallet',
        tabName: I18n.t('navbar.wallet'),
        badge: 0,
        component: WalletHome
    },
    {
        icon: require('../images/dapp.png'),
        selectedIcon: require('../images/dapp-active.png'),
        tabPage: 'Dapp',
        tabName: 'Dapp',
        badge: 0,
        component: Dapp
    },
    {
        icon: require('../images/settings.png'),
        selectedIcon: require('../images/settings-active.png'),
        tabPage: 'Settings',
        tabName: I18n.t('navbar.setting'),
        badge: 0,
        component: Settings
    },
];

const Tab = createBottomTabNavigator();

function Index() {
    return (
        <Tab.Navigator screenOptions={{
            tabBarStyle: { height: 65 },
        }} >
            {dataSource.map((v, i) => {
                return (
                    <Tab.Screen
                        key={i}
                        name={v.tabName}
                        component={v.component}
                        options={{
                            tabBarIcon: ({ focused, color, size }) => {
                                let imgIcon = focused ? v.selectedIcon : v.icon
                                if (i == 0) {
                                    return (<Image style={{ width: 20, height: 18 }} source={imgIcon} />)
                                } else if (i == 1) {
                                    return (<Image style={{ width: 22, height: 22 }} source={imgIcon} />)
                                } else if (i == 2) {
                                    return (<Image style={{ width: 20, height: 22 }} source={imgIcon} />)
                                }
                            },
                            tabBarItemStyle: {
                                paddingTop: 10,
                                paddingBottom: 10
                            },
                            tabBarLabelStyle: (focused) => {
                                if (focused) {
                                    return {
                                        fontFamily: 'PingFangSC-Medium, PingFang SC',
                                        fontWeight: '500',
                                        color: '#3E5CF9',
                                        fontSize: 10
                                    }
                                } else {
                                    return {
                                        fontFamily: 'PingFangSC-Medium, PingFang SC',
                                        fontWeight: '500',
                                        color: '#C0C9EA',
                                        fontSize: 10
                                    }
                                }

                            },
                            headerStyle: {
                                height: 0
                            }
                        }}
                    >
                    </Tab.Screen>
                )
            })}
        </Tab.Navigator >
    );
}

export default Index;