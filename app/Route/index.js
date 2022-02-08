import React from "react"
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import I18n from '../i18n/i18n'

import { colors, fontStyles } from '../styles/common'

import GuidePage from "../components/views/GuidePage"

import CreateWallet from '../components/views/CreateWallet'
import BackupStep1 from '../components/views/BackupStep1'
import BackupStep2 from '../components/views/BackupStep2'
import BackupStep3 from '../components/views/BackupStep3'
import CreateFinish from '../components/views/CreateFinish'

import TabBar from './tab-bar'
import ScanQRCode from '../components/views/Scan'

import walletManager from '../components/views/WalletManager'
import CreateAgain from "../components/views/WalletManager/createAgain"
import WalletDetail from "../components/views/WalletDetail"
import LeadWallet from '../components/views/LeadWallet'
import LeadPrivate from "../components/views/LeadPrivate"
import ExportPrivateStep1 from "../components/views/ExportPrivateStep1"
import ExportPrivateStep2 from "../components/views/ExportPrivateStep2"
import ExportPrivateStep3 from "../components/views/ExportPrivateStep3"

import AssetsManager from "../components/views/AssetsManager"
import AddAsset from "../components/views/AssetAdd"

import TransCompverse from "../components/transfer/transCompverse"
import Receive from "../components/wallet/receive"

import Browser from '../components/views/Browser'

import AddressBook from '../components/views/AddressBook'
import AddressBookEdit from '../components/views/AddressBookEdit'

const Stack = createNativeStackNavigator();


function Route() {

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="GuidePage" screenOptions={{ headerTitleAlign: 'center', headerTitleStyle: { ...fontStyles.normal, ...fontStyles.normalSize, color: colors.fontPrimary }, headerShadowVisible: false }}>
        <Stack.Screen name="GuidePage" component={GuidePage} options={{ headerShown: false }} />

        <Stack.Screen name="CreateWallet" component={CreateWallet} options={{ title: I18n.t('router.createWallet') }} />
        <Stack.Screen name="BackupStep1" component={BackupStep1} options={{ title: I18n.t('router.backupMnemonic') }} />
        <Stack.Screen name="BackupStep2" component={BackupStep2} options={{ title: I18n.t('router.backupMnemonic') }} />
        <Stack.Screen name="BackupStep3" component={BackupStep3} options={{ title: I18n.t('router.backupMnemonic') }} />
        <Stack.Screen name="CreateFinish" component={CreateFinish} options={{ headerShown: false }} />

        <Stack.Screen name="nav" component={TabBar} options={{ headerShown: false }} />
        <Stack.Screen name="ScanQRCode" component={ScanQRCode} options={{ title: I18n.t('router.scanQrCode') }} />

        <Stack.Screen name="walletManager" component={walletManager} options={{ title: I18n.t('router.walletManage') }} />
        <Stack.Screen name="CreateAgain" component={CreateAgain} options={{ title: I18n.t('router.createWallet') }} />
        <Stack.Screen name="WalletDetail" component={WalletDetail} options={{ title: I18n.t('router.walletDetail') }} />
        <Stack.Screen name="LeadWallet" component={LeadWallet} />
        <Stack.Screen name="LeadPrivate" component={LeadPrivate} />
        <Stack.Screen name="ExportPrivateStep1" component={ExportPrivateStep1} options={{ title: I18n.t('router.exportPrikey') }} />
        <Stack.Screen name="ExportPrivateStep2" component={ExportPrivateStep2} options={{ title: I18n.t('router.backupPrikey') }} />
        <Stack.Screen name="ExportPrivateStep3" component={ExportPrivateStep3} options={{ title: I18n.t('router.exportPrikey') }} />

        <Stack.Screen name="AssetsManager" component={AssetsManager} options={{ title: I18n.t('router.assetManage') }} />
        <Stack.Screen name="AddAsset" component={AddAsset} options={{ title: I18n.t('router.addAsset') }} />

        <Stack.Screen name="TransCompverse" component={TransCompverse} options={{ title: I18n.t('router.transfer') }} />
        <Stack.Screen name="Receive" component={Receive} options={{ title: I18n.t('router.receiving') }} />

        <Stack.Screen name="ToBrowser" component={Browser} options={{ headerBackVisible: false, title: '' }} />

        <Stack.Screen name="AddressBook" component={AddressBook} options={{ title: I18n.t('router.addressBook') }} />
        <Stack.Screen name="AddressBookEdit" component={AddressBookEdit} options={{ title: I18n.t('router.contacts') }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
export default Route