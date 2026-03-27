import { Navigate, createBrowserRouter, Outlet } from "react-router-dom";

import Login from "../pages/Login.tsx";
import Projects from "../pages/Projects.tsx";
import ProjectDetails from "../pages/ProjectDetails.tsx";
import ProjectFiles from "../pages/ProjectFiles.tsx";
import MissingComponent from "../pages/MissingComponent.tsx";
import RenderError from "../pages/Error.tsx";

import Layout from "../components/Layout.tsx";
import ProtectedRoute from "../components/ProtectedRoute.tsx";
import { UserAuthContextProvider } from "../context/authenticationContext.tsx";
import { ErrorContextProvider } from "../context/ErrorContext.tsx";
import ErrorBoundaryWrapper from "../components/ErrorBoundaryWrapper";

export interface routesType {
  path: string;
  element: React.ReactNode;
  children?: routesType[];
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
    path: "",
    element: (
      <ProtectedRoute>
        <Layout />
      </ProtectedRoute>
    ),
    children: [
      {
        path: "",
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
    path: "/error",
    element: <RenderError />,
  },
  {
    path: "*",
    element: <MissingComponent />,
  },
];

const mapRoutes = (routes: routesType[]): routesType[] => {
  return routes.map((route) => ({
    path: route.path,
    element: route.element,
    errorElement: <RenderError />,
    children: route.children ? mapRoutes(route.children) : undefined,
  }));
};

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <ErrorBoundaryWrapper>
        <ErrorContextProvider>
          <UserAuthContextProvider>
            <Outlet />
          </UserAuthContextProvider>
        </ErrorContextProvider>
      </ErrorBoundaryWrapper>
    ),
    errorElement: <RenderError />,
    children: mapRoutes(routes),
  },
]);

export default router;
