import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const features = [
  {
    title: "Smart Resume Builder",
    desc: "Create professional resumes in minutes with an intuitive editor and real-time formatting.",
    icon: "🧠",
    tag: "AI-Powered",
    stat: "2 min avg",
  },
  {
    title: "ATS-Friendly Templates",
    desc: "Choose from modern, classic, and creative templates optimized for hiring systems.",
    icon: "📄",
    tag: "Templates",
    stat: "50+ designs",
  },
  {
    title: "ATS Score Analyzer",
    desc: "Get instant ATS score with smart suggestions to improve your resume and increase hiring chances.",
    icon: "📊",
    tag: "ATS Score",
    stat: "95% accuracy",
  },
  {
    title: "Live Preview Editing",
    desc: "See changes instantly as you type with real-time updates.",
    icon: "👀",
    tag: "Real-Time",
    stat: "0ms lag",
  },
  {
    title: "PDF Download",
    desc: "Download high-quality resumes instantly for job applications.",
    icon: "⬇️",
    tag: "Export",
    stat: "1-click",
  },
  {
    title: "Custom Styling",
    desc: "Adjust colors, fonts, and layout to match your personal brand.",
    icon: "🎨",
    tag: "Design",
    stat: "∞ combos",
  },
  {
    title: "Cloud Save",
    desc: "Access your resumes anytime with secure cloud storage.",
    icon: "☁️",
    tag: "Storage",
    stat: "Always synced",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: "easeOut" },
  },
};

const accentColors = [
  "#6366f1",
  "#ec4899",
  "#10b981", // ATS green
  "#f59e0b",
  "#3b82f6",
  "#a855f7",
  "#14b8a6",
];

export default function FeaturesSection() {
  const [activeIndex, setActiveIndex] = useState(null);

  return (
    <section className="relative py-24 px-6 bg-white dark:bg-black text-center overflow-hidden">

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="mb-4"
      >
        <span className="inline-block text-xs font-semibold tracking-[0.2em] uppercase 
        text-indigo-500 bg-indigo-50 dark:bg-indigo-900/30 
        border border-indigo-200 dark:border-indigo-700 
        rounded-full px-4 py-1 mb-4">
          What's inside
        </span>

        <h2 className="text-4xl font-bold text-gray-900 dark:text-white">
          Powerful Features
        </h2>

        <p className="mt-3 text-gray-500 dark:text-gray-400 text-base max-w-md mx-auto">
          Everything you need to craft a resume that gets you hired.
        </p>
      </motion.div>

      {/* Stats */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.3, duration: 0.6 }}
        className="flex justify-center gap-10 mt-8 mb-14"
      >
        {[["10k+", "Resumes made"], ["98%", "ATS pass rate"], ["4.9★", "User rating"]].map(
          ([num, label]) => (
            <div key={label}>
              <div className="text-2xl font-bold text-gray-900 dark:text-white">{num}</div>
              <div className="text-xs text-gray-400 dark:text-gray-500">{label}</div>
            </div>
          )
        )}
      </motion.div>

      <div className="relative max-w-5xl mx-auto">

        {/* GRID */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-2 md:grid-cols-3 gap-6 mt-6"
        >
          {features.map((item, index) => {
            const accent = accentColors[index];
            const isActive = activeIndex === index;

            return (
              <motion.div key={index} variants={cardVariants}>
                <motion.div
                  onClick={() => setActiveIndex(isActive ? null : index)}
                  whileHover={{ y: -6 }}
                  animate={isActive ? { scale: 1.04 } : { scale: 1 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  className="relative mt-3 p-5 
                  bg-white/50 dark:bg-white/10 
                  backdrop-blur-xl 
                  border border-white/40 dark:border-white/10 
                  rounded-2xl w-full cursor-pointer text-left"
                  style={{
                    boxShadow: isActive
                      ? `0 0 0 1px ${accent}, 0 12px 40px ${accent}33`
                      : "0 8px 32px rgba(0,0,0,0.15)",
                  }}
                >

                  {/* Tag */}
                  <span
                    className="inline-block text-[10px] font-semibold uppercase rounded-full px-2.5 py-0.5 mb-3"
                    style={{
                      backgroundColor: `${accent}22`,
                      color: accent,
                    }}
                  >
                    {item.tag}
                  </span>

                  {/* Icon */}
                  <motion.div
                    whileHover={{ rotate: 12, scale: 1.2 }}
                    className="text-2xl mb-2"
                  >
                    {item.icon}
                  </motion.div>

                  <h3 className="font-semibold text-gray-900 dark:text-white text-base">
                    {item.title}
                  </h3>

                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1.5">
                    {item.desc}
                  </p>

                  {/* Expand */}
                  <AnimatePresence>
                    {isActive && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="overflow-hidden"
                      >

                        {/* ATS Special UI */}
                        {item.title === "ATS Score Analyzer" ? (
                          <div className="mt-3 pt-3 border-t border-green-400/30">

                            <div className="text-xs mb-1 text-gray-500">
                              Sample Score
                            </div>

                            <div className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                              <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: "85%" }}
                                transition={{ duration: 1 }}
                                className="h-full bg-green-500"
                              />
                            </div>

                            <div className="text-xs mt-1 font-semibold text-green-500">
                              85/100 ATS Score
                            </div>

                          </div>
                        ) : (
                          <div
                            className="mt-3 pt-3 border-t text-xs font-semibold"
                            style={{ borderColor: `${accent}33`, color: accent }}
                          >
                            ✦ {item.stat}
                          </div>
                        )}

                      </motion.div>
                    )}
                  </AnimatePresence>

                </motion.div>
              </motion.div>
            );
          })}
        </motion.div>

      </div>
    </section>
  );
}