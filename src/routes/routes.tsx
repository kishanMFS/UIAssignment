
import { Navigate } from 'react-router-dom'

import Login from '../pages/Login.tsx'

const routes = [
    {
        path: '/',
        element: <Navigate to="/login" replace />
    },
    {
        path: '/login',
        element: <Login />
    }
];

export default routes