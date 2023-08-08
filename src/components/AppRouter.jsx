import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { routes } from '../router'

const AppRouter = () => {
    return (
        <Routes>
            {routes.map(route =>
                <Route path={route.path} element={route.component} exact={route.exact} key={route.path} />
            )}

            <Route path="/" element={<Navigate to={'/api/v1/login'} />} />
            <Route path="*" element={<Navigate to={'/api/v1/error'} />} />
        </Routes>
    )
}

export default AppRouter
