import React, { useEffect } from 'react'
import '../../../styles/App.css';
import { useLocation, useNavigate } from 'react-router-dom'
import MyButton from '../button/MyButton';
import { useDispatch, useSelector } from 'react-redux';
import { setGlobalErrorAction } from '../../../store/errorGlobalReducer';
import { setGlobalMessageAction } from '../../../store/messageGlobalReducer';
import { setUserAction } from '../../../store/userReducer';
import { removeAccessTokenAction } from '../../../store/tokenReducer';
import { setModalStateAction } from '../../../store/modalReducer';

const MyNavbar = () => {
    const dispatch = useDispatch()
    const globalError = useSelector(state => state.error.error)
    const globalMessage = useSelector(state => state.message.message)
    const user = useSelector(state => state.user.user).split('@')[0]
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        if (globalError > 0) {
            if (globalError === 401) {
                dispatch(setGlobalMessageAction("You must log in"))
                dispatch(removeAccessTokenAction())
            }

            if (globalError === 403) {
                dispatch(setGlobalMessageAction("You do not have permission"))
                navigate("/api/v1/login")
            }
        }

        setTimeout(() => {
            dispatch(setGlobalMessageAction(''))
            dispatch(setGlobalErrorAction(0))
        }, 11000);
    }, [globalError, globalMessage])

    const logout = () => {
        dispatch(setUserAction(''))
        dispatch(removeAccessTokenAction())
        dispatch(setGlobalMessageAction("You are logged out"))
        navigate("/api/v1/login")
    }

    return (
        <div className="navbar">
            <div className="navbar__links_left">
                <div>Admin UI</div>
                {location.pathname !== "/api/v1/login"
                    &&
                    <MyButton onClick={() => dispatch(setModalStateAction(true))}>
                        Add new
                    </MyButton>
                }
            </div>

            {location.pathname !== "/api/v1/login"
                &&
                <div className="navbar__links__right">
                    <div className="navbar__link profile__photo"></div>
                    <div className="navbar__link">{user}</div>
                    {user
                        ?
                        <div className="navbar__link" onClick={() => { logout() }}>Logout</div>
                        :
                        <div className="navbar__link" onClick={() => { navigate("/api/v1/login") }}>Login</div>
                    }
                </div>
            }
        </div>
    )
}

export default MyNavbar
