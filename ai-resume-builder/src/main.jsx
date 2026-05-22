import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter, createBrowserRouter, RouterProvider } from 'react-router-dom'
import SignInPage from './auth/sign-in'
import Home from './Home/Home'
import Dashboard from './Dashboard/Dashboard'
import { ClerkProvider } from '@clerk/react'
import ResumeEdit from './Dashboard/resume/[resumeid]/edit/ResumeEdit'

const router = createBrowserRouter([
  {

element:<App/>,
children:[
 {
    path:'/dashboard',
    element:<Dashboard/>
  },
{
  path:'/dashboard/resume/:resumeid/edit',
  element:<ResumeEdit/>
}
]
  },
  
   {
    path:'/',
    element:<Home/>
  },
  
  
  {
    path:'/auth/sign-in',
    element:<SignInPage/>
  }
])

createRoot(document.getElementById('root')).render(
 
     <ClerkProvider>
    <RouterProvider router={router}/>
     </ClerkProvider>
 
)
