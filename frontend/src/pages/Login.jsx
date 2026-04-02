import React from 'react'
import { useDispatch } from 'react-redux'
import { login } from '@/app/features/autSlice'
import api from '@/configs/api'
import toast from 'react-hot-toast'
import { Link, useNavigate } from 'react-router-dom'
import Navbar from '@/components/shared/Navbar'
import { DotLottieReact } from '@lottiefiles/dotlottie-react';

const Login = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [formData, setFormData] = React.useState({
    email: '',
    password: ''
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const { data } = await api.post('/api/users/login', formData)

      dispatch(login(data))
      localStorage.setItem('token', data.token)

      toast.success(data.message)
      navigate('/app')
    } catch (error) {
      toast.error(error?.response?.data?.message || error.message)
    }
  }

  return (
      <div><Navbar />
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-black">


      <div className="w-[900px] h-[550px] 
      bg-white/30 dark:bg-white/10 
      backdrop-blur-xl 
      border border-white/20 
      rounded-2xl 
      shadow-2xl 
      overflow-hidden flex">

        {/* LEFT SIDE */}
        <div className="w-1/2 bg-gradient-to-br from-blue-900 via-black to-black flex items-center justify-center relative">

          <div className="absolute w-72 h-72 bg-white/10 rounded-full blur-3xl"></div>

          <div className="text-center px-6 z-10">
            <h2 className="text-white text-3xl font-bold">
              Resume Builder
            </h2>

            <p className="text-white/80 mt-2 text-sm">
              Create stunning resumes in minutes 🚀
            </p>

            <div className="mt-8">
              <DotLottieReact
                src="https://lottie.host/80f99f52-e1d1-4d04-8444-9c502a8e655c/v9C7ULY7St.lottie"
                loop
                autoplay
                className="w-[260px] h-[260px] mx-auto"
              />
            </div>
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="w-1/2 p-8 flex flex-col justify-center bg-transparent">

          <h1 className="text-2xl font-bold text-center text-gray-800 dark:text-white">
            Sign In
          </h1>

          <p className="text-gray-500 dark:text-gray-400 text-sm text-center mt-1">
            Welcome back 👋
          </p>

          <form onSubmit={handleSubmit} className="mt-6 space-y-4">

            {/* EMAIL */}
            <input
              type="email"
              name="email"
              placeholder="Email"
              className="w-full p-3 
              bg-gray-100 dark:bg-white/10 
              backdrop-blur-md 
              text-gray-800 dark:text-white 
              placeholder-gray-500 dark:placeholder-gray-400 
              rounded-lg outline-none 
              focus:ring-2 focus:ring-teal-500 
              transition"
              value={formData.email}
              onChange={handleChange}
              required
            />

            {/* PASSWORD */}
            <input
              type="password"
              name="password"
              placeholder="Password"
              className="w-full p-3 
              bg-gray-100 dark:bg-white/10 
              backdrop-blur-md 
              text-gray-800 dark:text-white 
              placeholder-gray-500 dark:placeholder-gray-400 
              rounded-lg outline-none 
              focus:ring-2 focus:ring-teal-500 
              transition"
              value={formData.password}
              onChange={handleChange}
              required
            />

            {/* BUTTON */}
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-3 rounded-full font-semibold hover:bg-teal-600 transition"
              >
              Login
            </button>

          </form>

          {/* REDIRECT */}
          <p className="text-gray-500 dark:text-gray-400 text-sm text-center mt-4">
            Don’t have an account?
            <Link to="/signup" className="text-teal-600 dark:text-teal-400 ml-1 font-medium">
              Signup
            </Link>
          </p>

        </div>

      </div>

    </div>
              </div>
  )
}

export default Login