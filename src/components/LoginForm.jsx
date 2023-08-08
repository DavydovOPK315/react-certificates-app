import React from 'react'
import MyInput from './UI/input/MyInput'
import MyButton from './UI/button/MyButton'
import '../styles/Login.css'
import Loader from './UI/Loader/Loader'

const LoginForm = ({ tokenError, handleSubmit, onSubmitHandler, register, errors, tokenIsLoading, globalMessage }) => {

    return (
        <div className="div__central">
            {tokenIsLoading
                ?
                <Loader />
                :
                <div className="wrapper">
                    <div className="form__text">
                        <h3>Login</h3></div>
                    <div className="login__form">
                        {tokenError &&
                            <div className='form__error'>
                                Wrong email or password
                            </div>
                        }

                        {globalMessage &&
                            <div className='form__error'>
                                {globalMessage}
                            </div>
                        }
                        <MyInput
                            {...register("email")}
                            defaultValue={"zbutko.artem@gmail.com"}
                            type="text"
                            placeholder="Email..."
                            required />
                        <p style={{ color: "red" }}>{errors.email?.message}</p>
                        <MyInput
                            {...register("password")}
                            defaultValue={"password"}
                            type="password"
                            placeholder="Password..."
                            required />
                        <p style={{ color: "red" }}>{errors.password?.message}</p>
                        <MyButton style={{ marginTop: "15px" }} onClick={handleSubmit(onSubmitHandler)}>Login</MyButton>
                    </div>
                </div>
            }
        </div>
    )
}

export default LoginForm
