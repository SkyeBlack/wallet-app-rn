import I18n, { getLanguages } from 'react-native-i18n'

import DeviceInfo from 'react-native-device-info'

// import DataRepository from'../dao/DataRepository'

import enUS from './en_US'

import zhTW from './zh_TW'

I18n.defaultLocale = 'zhTW';
// I18n.locale = 'cn'
I18n.fallbacks = true;

I18n.translations = {
    enUS,
    zhTW,
};
// I18n.localeLanguage = () => {
//     new DataRepository().fetchLocalRepository('localLanguage')
//         .then((res) => {
//             I18n.locale = res;

//         })
//         .catch((error) => {
//             I18n.locale = DeviceInfo.getDeviceLocale();
//         });
//     return I18n.locale;

// };
getLanguages().then(languages => {
    console.log(languages); // ['en-US', 'en']
});
export default I18n
