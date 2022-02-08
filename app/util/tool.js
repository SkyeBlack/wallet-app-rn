import { Alert } from 'react-native'
import BigNumber from "bignumber.js";
import Clipboard from '@react-native-clipboard/clipboard'

import I18n from '../i18n/i18n'

export function balanceFixed(balance) {
    return (new BigNumber(balance)).toFormat(4);
}

export function addressFixed(address) {
    return address.slice(0, 4) + '...' + address.slice(-4);
}

export function AddressCopy(address) {
    Clipboard.setString(address);
    Alert.alert(I18n.t('common.copySuccess'))
}