import axios from "axios";
import { setGlobalMessageAction } from "../store/messageGlobalReducer";
import { setGlobalErrorAction } from "../store/errorGlobalReducer";
import { useDispatch } from "react-redux";

// var dispatch = (link) => useDispatch(link);

export default class UserService {

    static async getAuthByKeyCloak(email, password) {

        let querystring = require('querystring');

        const response = await axios.post(
            'http://localhost:8080/auth/realms/demo/protocol/openid-connect/token',
            querystring.stringify({
                client_id: 'react',
                username: email,
                password: password,
                grant_type: 'password',
                client_secret: '8r9TaVAyKLCQr4A0n4aKoZzbrZok7rAb'
            })
            , {
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded"
                }
            }
        )
        // .catch(e => {
        //     console.log("Authentication error =>", e)
        //     // dispatch(setGlobalMessageAction(e.response["data"].errorMessage))
        //     // dispatch(setGlobalErrorAction(e.response.status))
        // });
        console.log("return ", response)
        return response.data['access_token'];
    }
}
