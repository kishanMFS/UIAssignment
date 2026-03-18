
import { Navigate } from 'react-router-dom'

import Login from '../pages/Login.tsx'
import Projects from '../pages/Projects.tsx'

const routes = [
    {
        path: '/',
        element: <Navigate to="/login" replace />
    },
    {
        path: '/login',
        element: <Login />
    },
    {
        path: '/projects',
        element: <Projects />
    }
];

export default routes