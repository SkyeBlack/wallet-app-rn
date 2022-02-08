let initialState = {
    allNet: [],
    currentNet: {
        chain: '',
        net: {}
    }
}

const netReducer = (state = initialState, action) => {
    const { type, data } = action
    switch (type) {
        case 'SET_ALL_NET':
            return {
                ...state,
                allNet: [...data]
            };
        case 'SET_CURRENT_NET':
            return {
                ...state,
                currentNet: { ...state.currentNet, ...data }
            };
        default:
            return state;
    }
}

export default netReducer