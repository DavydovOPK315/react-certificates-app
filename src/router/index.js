import Login from "../pages/Login";
import Certificates from "../pages/Certificates";
import Error from "../pages/Error";
import About from "../pages/About";

export const routes = [
    { path: '/api/v1/login', component: <Login/>, exact: true },
    { path: '/api/v1/certificates', component: <Certificates/>, exact: true },
    { path: '/api/v1/about', component: <About/>, exact: true },
    { path: '/api/v1/error', component: <Error/>, exact: true },
]