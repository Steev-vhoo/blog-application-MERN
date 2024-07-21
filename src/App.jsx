
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import LandingPage from './pages/landing'
import LoginPage from './pages/user/pages/Login'



function App() {
  const router = createBrowserRouter([
    {
      path:"/" ,
      element: <LandingPage/>
    },
    {
      path: "login",
      element: <LoginPage/>
    }
  ])

  return<RouterProvider router={router}/>
}

export default App
