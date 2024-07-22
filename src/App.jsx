
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import LandingPage from './pages/landing'
import LoginPage from './pages/user/pages/Login'
import SignUpPage from './pages/user/pages/SignUpPage'



function App() {
  const router = createBrowserRouter([
    {
      path:"/" ,
      element: <LandingPage/>
    },
    {
      path: "login",
      element: <LoginPage/>
    },
    {
      path: "signup",
      element: <SignUpPage/>
    }
  ])

  return<RouterProvider router={router}/>
}

export default App
