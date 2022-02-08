
export default function currentAccount(state = {}, action) {
    const { type, data } = action
    //根据type决定如何加工数据
    switch (type) {
        case 'INIT_CURRENT_ACCOUNT':
            return data
        case 'ADD_CURRENT_ACCOUNT':
            return data
        default:
            return state;
    }
}