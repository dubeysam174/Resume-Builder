import React from 'react'
import { useDispatch } from 'react-redux'
import { login } from '@/app/features/autSlice'
import api from '@/configs/api'
import toast from 'react-hot-toast'
import { Link, useNavigate } from 'react-router-dom'
import Navbar from '@/components/shared/Navbar'
import { DotLottieReact } from '@lottiefiles/dotlottie-react';

const Signup = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [formData, setFormData] = React.useState({
    name: '',
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
      const { data } = await api.post('/api/users/register', formData)

      dispatch(login(data))
      localStorage.setItem('token', data.token)

      toast.success(data.message)
      navigate('/login')
    } catch (error) {
      toast.error(error?.response?.data?.message || error.message)
    }
  }

 return (
  <div>
    <Navbar />

    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-black">

<div className="w-[900px] h-[550px] 
bg-white/30 dark:bg-white/10 
backdrop-blur-xl 
border border-white/20 
rounded-2xl 
shadow-2xl 
overflow-hidden flex">
        {/* LEFT SIDE */}
        <div className="w-1/2 bg-gradient-to-br from-blue-900 via-black to-black flex items-center justify-center">

          <div className="text-center px-6">
            <div className="bg-white text-black dark:bg-white/10 dark:text-white px-4 py-2 rounded-lg text-sm font-medium">
              Join us & build your dream resume 🚀
            </div>

            <div className="mt-10">
              <DotLottieReact
                src="https://lottie.host/ae7ffaf8-6db6-424e-a2e5-dd4f09bb65c6/6taXhb7Uia.lottie"
                loop
                autoplay
                className=""
              />
            </div>
          </div>

        </div>

        {/* RIGHT SIDE */}
        <div className="w-1/2 p-8 flex flex-col justify-center dark:bg-transparent">

          <h1 className="text-2xl font-bold text-center dark:text-white">
            Create Account
          </h1>

          <p className="text-gray-500 dark:text-gray-400 text-sm text-center mt-1">
            Start your journey today ✨
          </p>

          <form onSubmit={handleSubmit} className="mt-6 space-y-4">

            {/* NAME */}
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              className="w-full p-3 bg-gray-100 dark:bg-white/10 dark:text-white dark:placeholder-gray-400 rounded-lg outline-none focus:ring-2 focus:ring-indigo-500"
              value={formData.name}
              onChange={handleChange}
              required
            />

            {/* EMAIL */}
            <input
              type="email"
              name="email"
              placeholder="Email"
              className="w-full p-3 bg-gray-100 dark:bg-white/10 dark:text-white dark:placeholder-gray-400 rounded-lg outline-none focus:ring-2 focus:ring-indigo-500"
              value={formData.email}
              onChange={handleChange}
              required
            />

            {/* PASSWORD */}
            <input
              type="password"
              name="password"
              placeholder="Password"
              className="w-full p-3 bg-gray-100 dark:bg-white/10 dark:text-white dark:placeholder-gray-400 rounded-lg outline-none focus:ring-2 focus:ring-indigo-500"
              value={formData.password}
              onChange={handleChange}
              required
            />

            {/* BUTTON */}
            <button
              type="submit"
              className="w-full bg-indigo-600 text-white py-3 rounded-full hover:bg-indigo-700 transition"
            >
              Sign Up
            </button>

          </form>

          {/* REDIRECT */}
          <p className="text-gray-500 dark:text-gray-400 text-sm text-center mt-4">
            Already have an account?
            <Link to="/login" className="text-indigo-600 dark:text-indigo-400 ml-1 font-medium">
              Login
            </Link>
          </p>

        </div>

      </div>

    </div>
  </div>
)
}

export default Signup