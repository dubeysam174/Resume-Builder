import React from 'react'
import { Outlet, Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import Navbar from '../components/shared/Navbar'
import Loader from '../components/Loader'

const Layout = () => {
  // const { user, loading } = useSelector(state => state.auth)

  // if (loading) {
  //   return <Loader />
  // }

  // if (!user) {
  //   return <Navigate to="/login" replace />
  // }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-black">
      <Navbar />
      <Outlet />
    </div>
  )
}

export default Layout