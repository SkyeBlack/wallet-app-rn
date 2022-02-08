import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Image, ImageBackground } from 'react-native';
import { useEffect, useState } from "react"
import { connect } from 'react-redux'

import I18n from '../../../i18n/i18n'

const LeadWallet = ({ navigation, currentNet }) => {
  navigation.setOptions({
    title: I18n.t('router.LeadPriKey', { chain: currentNet.chain })
  });

  return (
    <View style={{ flex: 1, alignItems: 'center', paddingTop: 10 }}>
      <View style={{ width: 355, paddingLeft: 12, paddingRight: 12, backgroundColor: '#fff', borderRadius: 8 }}>
        <TouchableOpacity style={{ ...styles.itemWrap, borderBottomWidth: 1 }} onPress={() => navigation.navigate('LeadPrivate', {
          key: 1
        })}>
          <View style={styles.imageWrap}>
            <Image style={{ width: 19, height: 21 }} source={require('../../../images/key.png')}></Image>
          </View>
          <View>
            <Text>{I18n.t('leadWallet.leadPrikey')}</Text>
            <Text>{I18n.t('leadWallet.leadPrikeyText')}</Text>
          </View>
          <Image style={styles.next} source={require('../../../images/next.png')}></Image>
        </TouchableOpacity>
        <TouchableOpacity style={styles.itemWrap} onPress={() => navigation.navigate('LeadPrivate', {
          key: 2
        })} >
          <View style={styles.imageWrap}>
            <Image style={{ width: 23, height: 23 }} source={require('../../../images/mnemoic.png')}></Image>
          </View>
          <View>
            <Text>{I18n.t('leadWallet.leadMnemonic')}</Text>
            <Text>{I18n.t('leadWallet.leadMnemonicText')}</Text>
          </View>
          <Image style={styles.next} source={require('../../../images/next.png')}></Image>
        </TouchableOpacity>
      </View>
    </View >
  );
}

const styles = StyleSheet.create({
  assetsWrap: {
    padding: 20,
    backgroundColor: '#F9F9F9',
    flex: 1
  },
  centerWrap: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    height: 66,
    width: '100%',
    position: 'absolute',
    bottom: 0
  },
  baseSize: {
    fontSize: 12,
    fontFamily: 'PingFangSC-Medium, PingFang SC',
    color: '#333333',
    lineHeight: 22,
    fontWeight: '400',
  },
  infoSize: {
    fontSize: 16,
    fontFamily: 'PingFangSC-Medium, PingFang SC',
    color: '#333333',
    lineHeight: 22,
    fontWeight: '500',
    marginBottom: 4
  },
  itemWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 81,
    borderBottomWidth: 0,
    borderColor: '#F4F4F4',
    borderStyle: 'solid',
    position: 'relative'
  },
  imageWrap: {
    width: 40,
    height: 40,
    backgroundColor: "#CCDEFA",
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,

  },
  next: {
    width: 9,
    height: 16,
    position: 'absolute',
    right: 20,
    top: 33
  }
})

export default connect(
  state => ({
    currentNet: state.netReducer.currentNet
  }),
  {

  }
)(LeadWallet)