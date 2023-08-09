const defaultState = {
    certificates: [],
}

const GET_CERTIFICATES = "GET_CERTIFICATES"

export const certificateReducer = (state = defaultState, action) => {
    switch (action.type) {
        case GET_CERTIFICATES:
            return {...state, certificates: action.payload};
        default:
            return state
    }
}

export const getCertificatesAction = (payload) => ({
    type: "GET_CERTIFICATES",
    payload: payload
})