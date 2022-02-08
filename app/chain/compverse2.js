const Web3 = require("web3");
import "@ethersproject/shims";
const compverse2Ethers = require("ethers");
import Common from '@ethereumjs/common'
import { Transaction } from '@ethereumjs/tx'
import BigNumber from "bignumber.js";

import Utils from "../wallet/utils.js";
import axios from "axios"
import compverse2Abi from "../constants/compverse/compverse2Abi";

import { getCreateIndex } from "../wallet/walletUtil"

let compverse2Ip = '';
let compverse2Web3 = null;
let compverse2Provider = null;
let common = null;

const hdDerivationPath = `m/44'/60'/0'/0/`;
export const COMPVERSE2_DECIMALS = 1000_000_000_000_000_000;
export const COMPVERSE2_DECIMALS_B = new BigNumber(COMPVERSE2_DECIMALS);
export const COMPVERSE2_GAS_DECIMALS = 1000_000_000;

/******************** LOCAL ************************ */
export function compverse2Init(ip, chainId) {
    compverse2Ip = ip;
    compverse2Web3 = new Web3(new Web3.providers.HttpProvider(ip));
    compverse2Provider = new compverse2Ethers.providers.JsonRpcProvider(ip);
    common = Common.custom({ chainId: chainId })
}

/******************** PACKAGE ************************ */
/**
 * 验证2.0地址
 * @param {String} address 2.0地址
 * @returns 
 */
export function compverse2CheckAddress(address) {
    return compverse2Ethers.utils.isAddress(address)
}

/**
 * 创建Compverse2.0钱包
 * @param {*} mnemonic 助记词
 * @param {String} pwd 密码
 * @param {String} label 地址标签
 * @returns 
 */
export async function compverse2CreateAccount(mnemonic, pwd, HD, label = null) {
    let index = await getCreateIndex("COMPVERSE");
    console.log(mnemonic, pwd, label, index, HD, 'label')
    return new Promise(function (resolve, reject) {
        try {
            var account = compverse2Ethers.Wallet.fromMnemonic(mnemonic, hdDerivationPath + index);
            let accountObj = {};
            accountObj["index"] = index;
            if (label) {
                accountObj["name"] = label;
            } else {
                accountObj["name"] = 'Account' + index;
            }
            accountObj["address"] = account.address;
            let privateKey = Utils.encryptContent(account.privateKey, pwd);
            accountObj["privateKey"] = privateKey;
            accountObj["mnemonic"] = Utils.encryptContent(mnemonic, pwd);
            accountObj["balance"] = 0;
            accountObj["isHD"] = HD
            resolve(accountObj);
        } catch (err) {
            reject(err)
        }
    })
}

/**
 * 通过私钥导入Compverse2.0地址
 * @param {String} leadPrivateKey 私钥
 * @param {String} pwd 密码
 * @param {String} label 地址标签
 */
export function compverse2LeadPriKey(leadPrivateKey, pwd, label) {
    if (leadPrivateKey.length != 64 && leadPrivateKey.length != 66)  //0x10~0x19可以导入钱包
        return null;

    if (leadPrivateKey.substr(0, 2) != "0x") {
        leadPrivateKey = "0x" + leadPrivateKey;
    }

    try {
        var account2 = new compverse2Ethers.Wallet(leadPrivateKey);

        let accountObj = {}
        accountObj["name"] = label;
        accountObj["address"] = account2.address;
        accountObj["privateKey"] = Utils.encryptContent(leadPrivateKey, pwd);
        accountObj["balance"] = 0;
        accountObj["isHD"] = false
        return accountObj;
    } catch (err) {
        return null;
    }
}

/**
 * 通过助记词导入Compverse2.0地址
 * @param {String} leadMnemonic 助记词
 * @param {String} pwd 密码
 * @param {String} label 地址标签
 */
export function compverse2LeadMnemonic(leadMnemonic, pwd, label) {
    try {
        var account = compverse2Ethers.Wallet.fromMnemonic(leadMnemonic, hdDerivationPath + 0); //可以用助记词导入钱包
        let accountObj = {}
        accountObj["name"] = label;
        accountObj["address"] = account.address;
        accountObj["privateKey"] = Utils.encryptContent(account.privateKey, pwd);
        accountObj["mnemonic"] = Utils.encryptContent(account.mnemonic.phrase, pwd);
        accountObj["balance"] = 0;
        accountObj["isHD"] = false
        accountObj["index"] = 0
        return accountObj;
    } catch (err) {
        return null;
    }
}

/******************** API ************************ */

/**
 * Compverse2.0 查询余额
 * @param {String} address Compverse2.0 地址
 * @returns 
 */
export function compverse2_getBalance(address) {
    return axios.post(compverse2Ip, {
        "jsonrpc": "2.0",
        "method": "eth_getBalance",
        "params": [address, "latest"],
        "id": 1
    })
}

/**
 * Compverse2.0 查询token余额
 * @param {String} brc20Obj BRC20 资产对象
 * @param {String} address Compverse2.0 地址
 * @returns 
 */
export function compverse2_getTokenBalance(brc20Obj, address) {
    return new Promise(async function (resolve, reject) {
        let myContract = new compverse2Web3.eth.Contract(compverse2Abi.compverseContractAbi, brc20Obj.address);
        await myContract.methods
            .balanceOf(address) //用钱包地址
            .call(
                {
                    from: address,
                },
                (error, result) => {
                    if (error) {
                        console.error(error);
                        reject(error);
                    } else {
                        resolve(result / Math.pow(10, brc20Obj.decimals));
                    }
                }
            );
    })
}

/**
 * Compverse2.0 查询token信息
 * @param {String} address Compverse2.0 资产地址
 * @returns 
 */
export async function compverse2_getToken(address) {
    return new Promise(async function (resolve, reject) {
        await compverse2Web3.eth.getCode(address).then((res) => {
            if (res === "0x") {
                reject(res);
            } else {
                let myContract = new compverse2Web3.eth.Contract(compverse2Abi.compverseContractAbi, address);
                let token = { address: address, name: "", decimals: "", allAsset: 0 };

                myContract.methods.symbol().call({}, (errSyml, resSym) => {
                    if (errSyml) {
                        console.error(errSyml);
                        reject(errSyml);
                    } else {
                        token.name = resSym;

                        myContract.methods.decimals().call({}, (errDec, resDec) => {
                            if (errDec) {
                                console.error(errDec);
                                reject(errDec);
                            } else {
                                token.decimals = resDec;
                                resolve(token);
                            }
                        });
                    }
                });
            }
        });
    })
}

/**
 * Compverse2.0 转账
 * @param {String} privateKey 私钥
 * @param {String} toAddress 收款地址
 * @param {String} toAmount 转账数量
 * @param {String} gasPrice 手续费
 * @param {Number} gasLimit 最大手续费
 * @returns 
 */
export function compverse2_makeTx(privateKey, toAddress, toAmount, gasPrice, gasLimit) {
    return new Promise(function (resolve, reject) {
        let amount = new BigNumber(toAmount).multipliedBy(COMPVERSE2_DECIMALS);
        let wallet = new compverse2Ethers.Wallet(privateKey);
        let activeWallet = wallet.connect(compverse2Provider);

        activeWallet
            .sendTransaction({
                to: toAddress,
                value: "0x" + amount.toString(16),
                gasPrice: "0x" + (gasPrice * COMPVERSE2_GAS_DECIMALS).toString(16), //1Gwei
                gasLimit: gasLimit,
            })
            .then((res) => {
                resolve(res);
            })
            .catch((err) => {
                console.log(err)
                reject(err);
            });
    })
}

/**
 * Compverse2.0 token转账
 * @param {String} privateKey 私钥
 * @param {*} fromAddress 付款地址
 * @param {String} toAddress 收款地址
 * @param {String} toAmount 转账数量
 * @param {String} gasPrice 手续费
 * @param {Number} gasLimit 最大手续费
 * @param {*} contractAddress 代币地址
 * @param {*} decimals 代币精度
 * @returns 
 */
export async function compverse2_makeTokenTx(privateKey, fromAddress, toAddress, toAmount, gasPrice, gasLimit, contractAddress, decimals) {
    return new Promise(async function (resolve, reject) {
        let myContract = new compverse2Web3.eth.Contract(compverse2Abi.compverseContractAbi, contractAddress);
        await compverse2Web3.eth
            .getTransactionCount(fromAddress, compverse2Web3.eth.defaultBlock.pending)
            .then(function (nonce) {
                let currentDecimal = new BigNumber(Math.pow(10, parseInt(decimals)));
                let data = myContract.methods
                    .transfer(toAddress, new BigNumber(toAmount).multipliedBy(currentDecimal))
                    .encodeABI();

                let txParams = {
                    nonce: compverse2Web3.utils.toHex(nonce++),
                    gasLimit: compverse2Web3.utils.toHex(gasLimit),
                    gasPrice: compverse2Web3.utils.toHex(COMPVERSE2_GAS_DECIMALS) * gasPrice,
                    to: contractAddress,// 注意这里是代币合约地址
                    from: fromAddress,
                    value: "0x00",
                    data: data,
                };

                const tx = Transaction.fromTxData(txParams, { common })
                const keyBuf = Buffer.from(privateKey, 'hex',)
                const signedTx = tx.sign(keyBuf)
                const serializedTx = signedTx.serialize()
                const txHex = serializedTx.toString("hex");

                compverse2Web3.eth.sendSignedTransaction(
                    "0x" + txHex,
                    (err, txHash) => {
                        if (!err) {
                            resolve(txHash);
                        } else {
                            console.error(err);
                            reject(err);
                        }
                    }
                );
            })
            .catch((err) => {
                console.error(err);
                reject(err);
            });
    })
}