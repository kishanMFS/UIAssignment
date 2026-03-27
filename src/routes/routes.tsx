import { Navigate } from "react-router-dom";

import Login from "../pages/Login.tsx";
import Projects from "../pages/Projects.tsx";
import ProjectDetails from "../pages/ProjectDetails.tsx";
import ProjectFiles from "../pages/ProjectFiles.tsx";
import MissingComponent from "../pages/MissingComponent.tsx";

import Layout from "../components/Layout.tsx";
import ProtectedRoute from "../components/ProtectedRoute.tsx";

export interface routesType {
  path: string;
  element: React.ReactNode;
  children: routesType[];
}

const routes: routesType[] = [
  {
    path: "/",
    element: <Navigate to="/login" replace />,
  },
  {
    path: "login",
    element: <Login />,
  },
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <Layout />
      </ProtectedRoute>
    ),
    children: [
      {
        path: "/",
        element: <Navigate to="/project" replace />,
      },
      {
        path: "projects",
        element: <Projects />,
      },
      {
        path: "projects/:projectId",
        element: <ProjectDetails />,
      },
      {
        path: "projects/:projectId/files",
        element: <ProjectFiles />,
      },
    ],
  },
  {
    path: "*",
    element: <MissingComponent />,
  },
];

export default routes;
