
import { Navigate } from 'react-router-dom'

import Login from '../pages/Login.tsx'
import Projects from '../pages/Projects.tsx'
import ProjectDetails from '../pages/ProjectDetails.tsx'
import ProjectFiles from '../pages/ProjectFiles.tsx'
import MissingComponent from '../pages/MissingComponent.tsx'

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
    },
    {
        path: '/projects/:projectId/files',
        element: <ProjectFiles />
    },
    {
        path: '*',
        element: <MissingComponent />
    },
];

export default routes