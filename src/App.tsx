
import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import routes from './routes/routes.tsx'
import { UserAuthContextProvider } from './context/authenticationContext.tsx'
import { ErrorContextProvider } from './context/ErrorContext.tsx'
import ErrorBoundaryWrapper from "./components/ErrorBoundaryWrapper";
import RenderError from './pages/Error.tsx'

const renderRoutes = (routes: []) => {
  return routes.map((route) => (
    <Route  key={route.path} path={route.path} element={route.element}>
      {route.children && renderRoutes(route.children)}
    </Route>
  ))
}

function App() {
  return (
    <BrowserRouter>
      <ErrorContextProvider>{/* for global error handler */}
        <UserAuthContextProvider>

          <Routes>
            <Route path="/error" element={<RenderError />} />

            <Route path="/*" element={
              <ErrorBoundaryWrapper>
                <Routes>
                  {renderRoutes(routes)}
                </Routes>
              </ErrorBoundaryWrapper>
            }
            />
            
          </Routes>

        </UserAuthContextProvider>
      </ErrorContextProvider>
    </BrowserRouter>
  )
}

export default App
