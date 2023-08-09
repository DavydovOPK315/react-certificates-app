const defaultState = {
    loading: false
}

const SET_LOADING = "SET_LOADING";

export const loadingReducer = (state = defaultState, action) => {
    switch (action.type) {
        case SET_LOADING: {
            return { ...state, loading: action.payload }
        }
        default:
            return state;
    }
}

export const setLoadingAction = (payload) => ({
    type: SET_LOADING,
    payload: payload,
})