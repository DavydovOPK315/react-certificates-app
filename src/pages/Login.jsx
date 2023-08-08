import React, { useEffect } from 'react';
import LoginForm from '../components/LoginForm';
import { useForm } from 'react-hook-form';
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup";
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useFetching } from '../hooks/useFetching';
import { addAccessTokenAction } from '../store/tokenReducer';
import { setUserAction } from '../store/userReducer';
import { setGlobalMessageAction } from '../store/messageGlobalReducer';
import UserService from '../API/UserService';
import { setGlobalErrorAction } from '../store/errorGlobalReducer';

const schema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().min(8).max(32).required(),
});

const Login = () => {
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
  });

  const dispatch = useDispatch()
  const token = useSelector(state => state.token.token)
  const globalMessage = useSelector(state => state.message.message)
  const navigate = useNavigate();

  const [getToken, tokenIsLoading, tokenError] = useFetching(async (email, password) => {
    const response = await UserService.getAuthByKeyCloak(email, password);
    console.log("response => ", response)
    dispatch(addAccessTokenAction(response))
    dispatch(setUserAction(email))
    dispatch(setGlobalErrorAction(tokenError))
    dispatch(setGlobalMessageAction('You are now logged in'))
  })

  const doMyCustomLogin = async (data) => {
    await getToken(data.email, data.password);
    console.log("Login tokenError => ", tokenError);
  }

  useEffect(() => {
    if (token) {
      navigate("/api/v1/certificates");
    }
  }, [token])

  return (
    <LoginForm
      tokenError={tokenError}
      handleSubmit={handleSubmit}
      onSubmitHandler={doMyCustomLogin}
      register={register}
      errors={errors}
      tokenIsLoading={tokenIsLoading}
      globalMessage={globalMessage}
    />
  )
}

export default Login
