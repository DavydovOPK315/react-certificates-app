import axios from "axios";
import { getCertificatesAction } from "../../store/certificateReducer";
import { setLoadingAction } from "../../store/loadingReducer";
import { setGlobalErrorAction } from "../../store/errorGlobalReducer";
import { getPageCount } from "../../utils/pages";
import { setGlobalMessageAction } from "../../store/messageGlobalReducer";

const BASE_URL = "http://localhost:9090/api/v1/certificates";

export const fetchCertificatesThunk = (limit, page, setTotalPages) => {
    return function (dispatch) {
        dispatch(setLoadingAction(true));

        const headers = {
            "Content-Type": "application/json",
        }

        axios({
            method: 'get',
            url: `${BASE_URL}?pageNumber=${page}&pageSize=${limit}`,
            headers: headers,
        }).then(response => {
            console.log("fetchCertificatesThunk response ", response)
            const setTotalCount = response.headers['x-total-count']
            setTotalPages(getPageCount(setTotalCount, limit))
            dispatch(getCertificatesAction(response.data))
        }).catch(e => {
            console.log("fetch certificate error =>", e)
            dispatch(setGlobalMessageAction(e.response["data"].errorMessage))
            dispatch(setGlobalErrorAction(e.response.status))
        }).finally(() => {
            dispatch(setLoadingAction(false))
        });
    }
}

export const getCertificatesByNameOrDescriptionThunk = (limit, page, name, desc) => {
    return function (dispatch) {
        dispatch(setLoadingAction(true));

        const headers = {
            "Content-Type": "application/json",
        }

        axios({
            method: 'get',
            url: `${BASE_URL}/search/name-or-description?name=${name}&description=${desc}&pageNumber=${page}&pageSize=${limit}`,
            headers: headers,
        }).then(response => {
            console.log("getCertificatesByNameOrDescriptionThunk response ", response)
            dispatch(getCertificatesAction(response.data))
        }).catch(e => {
            console.log("get certificates by name  error =>", e)
            dispatch(setGlobalMessageAction(e.response["data"].errorMessage))
            dispatch(setGlobalErrorAction(e.response.status))
        }).finally(() => {
            dispatch(setLoadingAction(false))
        });
    }
}

export const updateCertificatesThunk = (certificate, token) => {
    return function (dispatch) {
        dispatch(setLoadingAction(true));

        const authHeader = "Bearer " + token;
        const payload = {
            id: certificate.id,
            name: certificate.name,
            description: certificate.description,
            price: certificate.price,
            duration: certificate.duration,
            tagRequestModels: certificate.tagResponseModels
        }
        const headers = {
            "Content-Type": "application/json",
            "Authorization": authHeader,
        }

        axios({
            method: 'put',
            url: `${BASE_URL}/${certificate.id}`,
            data: payload,
            headers: headers,
        }).then((response) => {
            console.log("updateCertificatesThunk response ", response)
            dispatch(setGlobalMessageAction(`Certificate with name = ${certificate.name} updated`))
        }).catch(e => {
            console.log("update certificate error =>", e)
            dispatch(setGlobalMessageAction(e.response["data"].errorMessage))
            dispatch(setGlobalErrorAction(e.response.status))
        })
    }
}

export const removeCertificatesThunk = (certificate, token) => {
    return function (dispatch) {
        dispatch(setLoadingAction(true));

        const authHeader = "Bearer " + token;
        const headers = {
            "Content-Type": "application/json",
            "Authorization": authHeader,
        }

        axios({
            method: 'DELETE',
            url: `${BASE_URL}/${certificate.id}`,
            headers: headers,
        }).then((response) => {
            console.log("removeCertificatesThunk response ", response)
            dispatch(setGlobalMessageAction(`Certificate with id = ${certificate.id} removed`))
        }).catch(e => {
            dispatch(setGlobalMessageAction(e.response["data"].errorMessage))
            dispatch(setGlobalErrorAction(e.response.status))
        })
    }
}

export const addCertificatesThunk = (certificate, token) => {
    return async function (dispatch) {
        dispatch(setLoadingAction(true));

        const authHeader = "Bearer " + token;
        const payload = JSON.stringify({
            name: certificate.name,
            description: certificate.description,
            price: certificate.price,
            duration: certificate.duration,
            tagRequestModels: certificate.tagResponseModels
        })
        const headers = {
            "Content-Type": "application/json",
            "Authorization": authHeader,
        }

        const response = await axios({
            method: 'post',
            url: `${BASE_URL}`,
            data: payload,
            headers: headers,
        }).then((response) => {
            console.log("addCertificatesThunk response ", response)
            dispatch(setGlobalMessageAction(`Certificate with name = ${certificate.name} added`))
        }).catch(e => {
            console.log("add certificate error =>", e)
            dispatch(setGlobalMessageAction(e.response["data"].errorMessage))
            dispatch(setGlobalErrorAction(e.response.status))
        })
        return response;
    }
}