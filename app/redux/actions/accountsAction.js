export const ADD_ACCOUNTS = (data, chainName) => {
    return { type: 'ADD_ACCOUNTS', data, chainName }
}
export const DELETE_ACCOUNTS = (data, chainName) => {
    return { type: 'DELETE_ACCOUNTS', data, chainName }
}
export const INIT_ACCOUNTS = (data) => {
    return { type: 'INIT_ACCOUNTS', data }
}

//存储当前账户
export const ADD_CURRENT_ACCOUNT = (data) => {
    return { type: 'ADD_CURRENT_ACCOUNT', data }
}

//初始化当前账户
export const INIT_CURRENT_ACCOUNT = (data) => {
    return { type: 'INIT_CURRENT_ACCOUNT', data }
}

