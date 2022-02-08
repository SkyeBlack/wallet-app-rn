import Utils from './utils'

//备份私钥输入密码
export const surePWDPrivateKey = (privateKey, pwd) => {
    let result = Utils.decryptContent(
        privateKey,
        pwd
    )
    return result
}
//备份助记词输入密码
export const surePWDMnemonic = (phrase, pwd) => {
    let result = Utils.decryptContent(
        phrase,
        pwd
    )
    return result
}