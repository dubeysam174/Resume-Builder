import React from "react";
import { motion } from "framer-motion";

const HeroSection = () => {
  return (
<section className="bg-white dark:bg-gradient-to-br dark:from-blue-900 dark:via-black dark:to-black text-black dark:text-white overflow-hidden">      <div className="max-w-7xl mx-auto flex flex-col-reverse lg:flex-row items-center gap-12 px-4 py-16">

        {/* LEFT CONTENT */}
        <motion.div
          initial={{ opacity: 0, x: -60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="flex-1 text-center lg:text-left"
        >
        <h1 className="text-4xl md:text-5xl font-bold leading-tight text-black dark:text-white">
  Build Your{" "}

  {/* 🔥 Slide Animation (NO GLOW) */}
  <span className="inline-block overflow-hidden">
    <motion.span
      initial={{ y: "100%", opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut", delay: 0.3 }}
      className="inline-block text-indigo-600"
    >
      Professional Resume
    </motion.span>
  </span>{" "}

  in Minutes
</h1>

          <p className="mt-6 text-lg text-black dark:text-white">
            Create ATS-friendly resumes with AI-powered suggestions.
            Stand out and land your dream job faster.
          </p>

          {/* BUTTONS */}
          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-xl font-semibold shadow-md transition"
            >
              Get Started
            </motion.button>

            

          </div>

          
        </motion.div>

        {/* RIGHT IMAGE */}
        <motion.div
          initial={{ opacity: 0, x: 60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="flex-1 flex justify-center"
        >
          <motion.img
            src="https://cdn.prod.website-files.com/62775a91cc3db44c787149de/67994edfc94bf5d1172bcd83_ai-resume-builder1.webp"
            alt="resume"
            className="rounded-xl w-full max-w-md 
shadow-[0_20px_60px_rgba(0,0,0,0.3)] 
dark:shadow-[0_20px_60px_rgba(99,102,241,0.3)]"
            animate={{ y: [0, -10, 0] }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </motion.div>

      </div>
    </section>
  );
};

export default HeroSection;