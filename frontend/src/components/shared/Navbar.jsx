import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Link,useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "@/app/features/autSlice";
import DarkModeToggle from "@/theme/darkMode";
import api from "@/configs/api";
import toast from "react-hot-toast";
const Navbar = () => {
  const [open, setOpen] = useState(false);
  const dispatch =useDispatch()
  const navigate=useNavigate()
  const {user} = useSelector(state => state.auth)
  
  //for logoutUser
  const logoutUser=()=>{
    navigate('/')
    dispatch(logout())
  }

  // fr redirecting to 

const handleATSClick = async () => {
  try {
    if (!user) {
      return navigate("/login");
    }

    // ✅ 1. Get user's resumes
    const { data } = await api.get("/api/resumes/my");

    let resumeId;

    if (data.resumes && data.resumes.length > 0) {
      // ✅ existing resume
      resumeId = data.resumes[0]._id;
    } else {
      // ✅ create new resume
      const res = await api.post("/api/resumes/create");
      resumeId = res.data.resume._id;
    }

    // ✅ navigate with real ID
    navigate(`/resume/${resumeId}`, {
      state: { openATS: true },
    });

  } catch (error) {
    console.error(error);
    toast.error("Something went wrong");
  }
};
  


  return (
<nav className="sticky top-0 z-50 
bg-white/40 dark:bg-slate-900/40 
backdrop-blur-xl 
border-b border-white/30 dark:border-slate-700/40 
shadow-sm">     
<div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between ">
        
        {/* LOGO */}
        <Link to='/'>
        <h1 className="text-2xl font-bold text-blue-600 animate-pulse">
         Skill<span className="font-bold text-black  dark:text-white" >Sync</span>
        </h1>
        </Link>

        {/* DESKTOP MENU */}
        <div className="hidden md:flex items-center gap-8">
          <div>
            <DarkModeToggle/>
          </div>
         <Link to='/app' hidden={!user}>
         <p className="text-black dark:text-white hover:text-purple-600 transition">Dashboard</p>
         </Link>
         
          <Link to="/app"></Link>
          <div>
            <button onClick={handleATSClick} className="text-indigo-600 font-semibold hover:underline" hidden={user}>
  ATS Score?
</button>
          </div>
          <Button onClick={()=>navigate('/login')} className="bg-blue-600 hover:bg-blue-500 text-white cursor-pointer" hidden={user}>
            Get Started
          </Button>
          <div className="flex "hidden={!user}>
           <p className="mt-1">Welcome back, {user?.name} 👋</p> 
          <Button onClick={logoutUser} hidden={!user} className='cursor-pointer bg-blue-600 hover:bg-blue-500'>Logout</Button>
          </div>
        </div>

        
       
      </div>

     
      
    </nav>
  );
};

export default Navbar;