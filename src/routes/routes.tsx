
import { Navigate } from 'react-router-dom'

import Login from '../pages/Login.tsx'
import Projects from '../pages/Projects.tsx'
import ProjectDetails from '../pages/ProjectDetails.tsx'

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
    },
    {
        path: '/projects/:projectId',
        element: <ProjectDetails />
    }
];

export default routes