import DeviceStorage from "./DeviceStorage"
import store from '../redux/store'
import { ALL_ACCOUNTS, CURRENT_ACCOUNT, MNEMONIC } from "../constants/storage"
import { INIT_ACCOUNTS, INIT_CURRENT_ACCOUNT, DELETE_ACCOUNTS, ADD_ACCOUNTS, ADD_CURRENT_ACCOUNT } from "../redux/actions/accountsAction"

const chainName = store.getState().netReducer.currentNet.chain
//从本地获取所有账户
export const getAllAccounts = async () => {
    let accounts = await DeviceStorage.get(ALL_ACCOUNTS) || []
    store.dispatch(INIT_ACCOUNTS(accounts))
}

//从本地获取当前账户
export const getCurrentAccounts = async () => {
    let account = await DeviceStorage.get(CURRENT_ACCOUNT) || {}
    store.dispatch(INIT_CURRENT_ACCOUNT(account))
    return account
}

/**
 * 添加账户
 * @param {Object} account 账户
 * @param {String} chainName 链名
 * @returns 
 */
export const addAccounts = (account) => {
    store.dispatch(ADD_ACCOUNTS(account, chainName))
    let accounts = store.getState().accounts
    console.log(accounts, 'addaccounts')
    DeviceStorage.save(ALL_ACCOUNTS, accounts)
}

/**
 * 更新账户
 * @param {Object} account 账户
 * @param {String} chainName 链名
 * @returns 
 */
export const updateAccounts = (account) => {
    store.dispatch(DELETE_ACCOUNTS(account, chainName))
    DeviceStorage.save(ALL_ACCOUNTS, store.getState().accounts)
}

/**
 * 更新当前账户
 * @param {Object} account 账户
 * @param {String} chainName 链名
 * @returns 
 */
export const updateCurrentAccount = (account) => {
    store.dispatch(ADD_CURRENT_ACCOUNT({ ...account, chainName }))
    DeviceStorage.save(CURRENT_ACCOUNT, { ...account, chainName })
}


/**
 * 存储助记词
 * @param {String} mnemonic 助记词
 * @returns 
 */
export const saveMnemonic = (mnemonic) => {
    DeviceStorage.save(MNEMONIC, mnemonic)
}

//从本地获取助记词
export const getMnemonic = async () => {
    let mnemonic = await DeviceStorage.get(MNEMONIC) || ''
    return mnemonic
}