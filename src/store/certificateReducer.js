const defaultState = {
    certificates: [],
}

const GET_CERTIFICATES = "GET_CERTIFICATES"

export const certificateReducer = (state = defaultState, action) => {
    switch (action.type) {
        case GET_CERTIFICATES:
            return {...state, certificates: action.payload};
            // return {...state, certificates: [...state.certificates, action.payload]};
        case "ADD_CERTIFICATE":
            return state
        case "DELETE_CERTIFICATE":
            return state
        default:
            return state
    }
}

export const getCertificatesAction = (payload) => ({
    type: "GET_CERTIFICATES",
    payload: payload
})