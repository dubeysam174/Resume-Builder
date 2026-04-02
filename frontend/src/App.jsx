import React, { useEffect } from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Layout from './pages/Layout'
import Dashboard from './pages/Dashboard'
import ResumeBuilder from './pages/ResumeBuilder'
import Login from './pages/Login'
import Preview from './pages/Preview'
import { useDispatch } from 'react-redux'
import api from './configs/api'
import {login,setLoading} from './app/features/autSlice'
import {Toaster} from 'react-hot-toast'
import Signup from './pages/Signup'
import ProtectedRoute from './protectedroutes/ProtectedRoutes'
import TemplateSection from './components/TemplatePreview/TemplateSection'
const App = () => {

  // const dispatch = useDispatch()
  // const getUserData = async ()=>{
  //   const token = localStorage.getItem('token')
  //   try {

  //     if(token){
  //       const {data}=await api.get('/api/users/data',{headers:{Authorization:token}})
  //       if(data.user){
  //         dispatch(login({token,user:data.user}))
  //       }
  //       dispatch(setLoading(false))
  //     }
  //     else{
  //       dispatch(setLoading(false))
  //     }

      
  //   } catch (error) {
  //     dispatch(setLoading(false))
  //     console.log(error.message)
  //   }
  // }

  // useEffect(()=>{
  //   getUserData
  // },[])
  return (
    <>
    <Toaster/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='app' element={<Layout/>}>
           <Route index element={<ProtectedRoute><Dashboard/></ProtectedRoute>}/>
           <Route path='builder/:resumeId' element={<ProtectedRoute>
      <ResumeBuilder />
    </ProtectedRoute>}/>
        </Route>
       
       <Route path='view/:resumeId' element={<Preview/>}/>
       <Route path='login' element={<Login/>}/>
       <Route path="/signup" element={<Signup />} />
      

         
      </Routes>
    </>
  )
}

export default App
