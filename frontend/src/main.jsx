import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

import{
  createBrowserRouter,
  RouterProvider,
  Route
} from "react-router-dom";
import RegisterForm from './pages/RegisterForm.jsx';
import PhotoDetail from './pages/PhotoDetail.jsx';
import HomePage from './pages/HomePage.jsx';
import ProfileUser from './pages/ProfileUser.jsx';

const router = createBrowserRouter([
  {
      path:"/",
      element: <App/>,
  },
  {
      path:"/home",
      element: <HomePage/>,
  },
  {
      path:"/profile",
      element: <ProfileUser />,
  },
  {
      path:"/photo/:id",
      element: <PhotoDetail /> 
  },
  {
      path:"/register",
      element: <RegisterForm />,
  },
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <>
  <RouterProvider router={router} />
  <React.StrictMode />
  </>
)
