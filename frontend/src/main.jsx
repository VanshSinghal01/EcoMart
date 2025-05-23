import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import CartComponent from './Cartcomponent.jsx'
import PaymentComponent from './PaymentComponent';
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

let data= createBrowserRouter([
  {
    path:'/',
    element:<App/>
  },
  {
    path:'/CartComponent',
    element:<CartComponent/>
  },
  {
    path:'/PaymentComponent',
    element:<PaymentComponent/>
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
 <RouterProvider router={data}>
  <App/>
 </RouterProvider>
)