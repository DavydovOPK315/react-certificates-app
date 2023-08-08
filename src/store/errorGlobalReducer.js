const defaultValue = {
    error: 0
}

const SET_GLOBAL_ERROR = "SET_GLOBAL_ERROR"

export const errorGlobalResuder = (state = defaultValue, action) => {
    switch (action.type) {
        case SET_GLOBAL_ERROR: {
            return { ...state, error: action.payload }
        }
        default: {
            return state
        }
    }
}

export const setGlobalErrorAction = (payload) => ({
    type: SET_GLOBAL_ERROR,
    payload: payload,
})

