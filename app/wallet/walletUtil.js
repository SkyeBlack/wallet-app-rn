const bip39 = require("react-native-bip39");
import Utils from "./utils.js";
import DeviceStorage from "../util/DeviceStorage.js";
import { ALL_ACCOUNTS } from "../constants/storage.js";

const PWD_REG = /(?=.*[0-9])(?=.*[A-Za-z])(?=.*[!@#$%^&*_]).{8,20}/;

/**
 * 密码正则验证
 * @param {String} pwd 密码
 * @returns 
 */
export function checkPassword(pwd) {
    return PWD_REG.test(pwd);
}

/**
 * 生成随机助记词
 * @returns 
 */
export function createMnemonic() {
    const MNEMONIC_LEN = 128;
    const generateMnemonic = () => bip39.generateMnemonic(MNEMONIC_LEN);
    let randomMnemonic = generateMnemonic();
    return randomMnemonic;
}

/**
 * 获取加密助记词
 * @param {String} mnemonic 助记词
 * @param {String} pwd 密码
 */
export function getEncryptMnemonic(mnemonic, pwd) {
    return Utils.encryptContent(mnemonic, pwd);
}

/**
 * 存储助记词
 * @param {String} encryptMnemonic 加密助记词
 */
export function saveSourseMnemonic(encryptMnemonic) {
    localStorage.setItem("sourseMnemonic", JSON.stringify(encryptMnemonic));
}

/**
 * 获取原始助记词
 * @param {String} pwd 密码
 */
export function getSourseMnemonic(pwd) {
    let localMnemonic = localStorage.getItem("sourseMnemonic");
    if (localMnemonic) {
        return Utils.decryptContent(JSON.parse(localMnemonic), pwd);
    }
    return null;
}

// /**
//  * 验证是否是原始助记词
//  * @param {String} mnemonic 助记词
//  * @param {String} pwd 密码
//  */
// export function isSourceMnemonic(mnemonic, pwd) {
//     let localMnemonic = getSourseMnemonic(pwd);
//     if (mnemonic == localMnemonic) return true;
//     else return false;
// }

/**
 * 保存钱包索引
 * @param {String} walletType 
 * @param {Number} newIndex 
 */
// export function saveAccountIndex(walletType, newIndex) {
//     let indexList = null;
//     let indexName = "";
//     switch (walletType) {
//         case "COMPVERSE":
//             indexName = "index1";
//             break;
//         case "COMPVERSE2":
//             indexName = "index2";
//             break;
//         case "BTC":
//             indexName = "indexBTC";
//             break;
//         case "ETH":
//             indexName = "indexETH";
//             break;
//         case "FIL":
//             indexName = "indexFIL";
//             break;
//         default:
//             break;
//     }

//     indexList = JSON.parse(localStorage.getItem(indexName));
//     if (indexList) {
//         if (indexList.delete) {
//             let sameIndex = -1;
//             for (let i = 0; i < indexList.delete.length; i++) {
//                 if (indexList.delete[i] == newIndex) {
//                     sameIndex = i;
//                     break;
//                 }
//             }
//             if (sameIndex != -1) {
//                 indexList.delete.splice(sameIndex, 1);
//             }
//         }

//         if (indexList.exists) {
//             indexList.exists.push(newIndex);
//             indexList.exists = indexList.exists.sort();
//         } else {
//             indexList.exists = [];
//             indexList.exists.push(newIndex);
//         }
//     } else {
//         indexList = {
//             exists: [],
//             delete: []
//         };
//         indexList.exists.push(newIndex);
//     }

//     localStorage.setItem(indexName, JSON.stringify(indexList));
// }

/**
 * 获取当前创建索引
 * @param {String} walletType 账户类型
 * @returns
 */
export async function getCreateIndex(chainName) {
    let currentAccounts = await DeviceStorage.get(ALL_ACCOUNTS) || []
    let createIndex = 0
    const id = currentAccounts.findIndex(item => item.chainName == chainName)
    if (id != -1) {
        let filterArray = currentAccounts[id].accounts.filter(item => item.isHD)
        let sortArray = filterArray.sort(compare('index'))
        if (sortArray.length > 0) {
            for (let i = 0; i < sortArray.length; i++) {
                if (sortArray[i].index != i) {
                    createIndex = i
                    break
                }
                else {
                    createIndex = i + 1
                }
            }

        }
    }
    return createIndex;
}
function compare(property) {
    return function (a, b) {
        return a[property] - b[property];
    }
}
// export function getCreateIndex(walletType) {
//     let createIndex = 0;
//     let indexList = null;
//     switch (walletType) {
//         case "COMPVERSE":
//             indexList = JSON.parse(localStorage.getItem("index1"))
//             break;
//         case "COMPVERSE2":
//             indexList = JSON.parse(localStorage.getItem("index2"))
//             break;
//         case "BTC":
//             indexList = JSON.parse(localStorage.getItem("indexBTC"))
//             break;
//         case "ETH":
//             indexList = JSON.parse(localStorage.getItem("indexETH"))
//             break;
//         case "FIL":
//             indexList = JSON.parse(localStorage.getItem("indexFIL"))
//             break;
//         default:
//             break;
//     }

//     if (indexList) {
//         if (indexList.delete && indexList.delete.length > 0) {
//             createIndex = indexList.delete[0];
//         } else {
//             createIndex = indexList.exists.length;
//         }
//     }

//     return createIndex;
// }

/**
 * 删除钱包索引
 * @param {String} walletType
 * @param {Number} deleteIndex
 */
// export function deleteAccountIndex(walletType, deleteIndex) {
//     let indexList = null;
//     let indexName = "";
//     switch (walletType) {
//         case "COMPVERSE":
//             indexName = "index1";
//             break;
//         case "COMPVERSE2":
//             indexName = "index2";
//             break;
//         case "BTC":
//             indexName = "indexBTC";
//             break;
//         case "ETH":
//             indexName = "indexETH";
//             break;
//         case "FIL":
//             indexName = "indexFIL";
//             break;
//         default:
//             break;
//     }
//     indexList = JSON.parse(localStorage.getItem(indexName));

//     let sameIndex = -1;
//     for (let i = 0; i < indexList.exists.length; i++) {
//         if (indexList.exists[i] == deleteIndex) {
//             sameIndex = i;
//             break;
//         }
//     }
//     if (sameIndex != -1) {
//         indexList.exists.splice(sameIndex, 1);
//     }

//     if (indexList.exists.length == 0) {
//         indexList.delete = [];
//     } else {
//         if (indexList.delete) {
//             indexList.delete.push(deleteIndex);
//             indexList.delete = indexList.delete.sort();
//         } else {
//             indexList.exists = [];
//             indexList.exists.push(deleteIndex);
//         }
//     }

//     localStorage.setItem(indexName, JSON.stringify(indexList));
// }