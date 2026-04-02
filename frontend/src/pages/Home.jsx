import React from 'react'

import HeroSection from '../components/HeroSection'

import Navbar from '@/components/shared/Navbar'

import FeaturesSection from '@/components/FeaturesSection'
import TemplatesSection from '@/components/TemplatePreview/TemplateSection'
import Footer from '@/components/Footer'
const Home = () => {
  return (
    <div className='bg-white dark:bg-black'>
      <Navbar/>
    <HeroSection/>
    
    <FeaturesSection/>
   <TemplatesSection/>
   
   <Footer/>
   
    </div>
  )
}

export default Home
