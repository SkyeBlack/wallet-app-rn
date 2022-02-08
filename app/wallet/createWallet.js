import { compverse2CreateAccount } from "../chain"
import DeviceStorage from '../util/DeviceStorage'  //使用手机存储
import { compverse2 } from '../redux/actions/accountsAction.js'
import store from "../redux/store";
import Web3 from "web3";
/**
 * 创建2.0钱包
 * @param {String} pwd 密码
 * @param {String} name 账号名称
 * @param {String} mnemonic 助记词
 */
export function createWallet2(pwd, name, mnemonic, HD) {
    return new Promise((resolve, reject) => {
        compverse2CreateAccount(mnemonic, pwd, HD, name).then((resCompverse2) => {
            resolve(resCompverse2)
        })
            .catch(err => {
                reject(err)
            })
    })
}

/**
 * 创建1.0钱包
 * @param {String} pwd 密码
 * @param {String} name 账号名称
 * @param {String} mnemonic 助记词
 */
export function createWallet1(pwd, name, mnemonic) {
    compverseCreateAccount(mnemonic, pwd, name).then((resCompverse) => {
        console.log(resCompverse, 'res')
        DeviceStorage.save('getNewCreateWalletCompverse', resCompverse)
    }).catch(err => {
        Promise.reject(err)
    });
}

/**
 * 创建BTC钱包
 * @param {String} pwd 密码
 * @param {String} name 账号名称
 * @param {String} mnemonic 助记词
 */
export async function createWalletBTC(pwd, name, mnemonic) {
    console.log(pwd, name, mnemonic)
    await btcCreateAccount(mnemonic, pwd, name).then((resBtc) => {
        DeviceStorage.save('getNewCreateWalletBTC', resBtc)
    }).catch(err => {
        console.log(err)
        Promise.reject(err)
    });
}

/**
 * 创建ETH钱包
 * @param {String} pwd 密码
 * @param {String} name 账号名称
 * @param {String} mnemonic 助记词
 */
export function createWalletETH(pwd, name, mnemonic) {
    ethCreateAccount(mnemonic, pwd, name).then((resEth) => {
        DeviceStorage.save('getBipList', mnemonic.split(' '))  //存储助记词
        DeviceStorage.save('getNewCreateWalletETH', resEth)
    }).catch(err => {
        Promise.reject(err)
    });
}

/**
 * 创建FIL钱包
 * @param {String} pwd 密码
 * @param {String} name 账号名称
 * @param {String} mnemonic 助记词
 */
export async function createWalletFIL(pwd, name, mnemonic) {
    await filCreateAccount(mnemonic, that.inputPwd, that.inputName).then((resFil) => {
        DeviceStorage.save('getBipList', mnemonic.split(' '))  //存储助记词
        DeviceStorage.save('getNewCreateWalletFIL', resFil)
    }).catch(err => {
        Promise.reject(err)
    });
}
