
import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import routes from './routes/routes.tsx'
import { UserAuthContextProvider } from './context/authenticationContext.tsx'
import { ErrorContextProvider } from './context/ErrorContext.tsx'


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
            {renderRoutes(routes)}
          </Routes>
        </UserAuthContextProvider>
      </ErrorContextProvider>
    </BrowserRouter>
  )
}

export default App
