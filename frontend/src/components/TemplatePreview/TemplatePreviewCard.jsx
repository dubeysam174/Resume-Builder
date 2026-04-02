import { dummyResumeData } from "@/assets/assets";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";

import ModernTemplate from "./ModernTemplate1";
import ClassicTemplate from "./ClassicTemplate0";
import MinimalImageTemplate from "./MinimalImageTemplate0";

const templateMap = {
  modern: ModernTemplate,
  classic: ClassicTemplate,
  "minimal-image": MinimalImageTemplate,
};

const templateMeta = {
  modern: { tag: "Popular", color: "#818cf8", tagBg: "rgba(129,140,248,0.15)" },
  classic: { tag: "Timeless", color: "#34d399", tagBg: "rgba(52,211,153,0.15)" },
  "minimal-image": { tag: "Creative", color: "#f472b6", tagBg: "rgba(244,114,182,0.15)" },
};

const TemplatePreviewCard = ({ templateId, onPreview }) => {
  const Template = templateMap[templateId];
  const data = dummyResumeData[0];
  const meta = templateMeta[templateId] ?? {
    tag: "Template",
    color: "#818cf8",
    tagBg: "rgba(129,140,248,0.15)",
  };
  const [hovered, setHovered] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href =
      "https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Sans:wght@400;500&display=swap";
    document.head.appendChild(link);
  }, []);

  if (!Template) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      onClick={() => onPreview?.({ templateId, data })}
      className="group cursor-pointer relative flex flex-col rounded-2xl overflow-hidden"
      style={{
        background: "linear-gradient(145deg, #13131f, #1a1a2e)",
        border: hovered
          ? `1.5px solid ${meta.color}55`
          : "1.5px solid rgba(255,255,255,0.07)",
        boxShadow: hovered
          ? `0 0 0 1px ${meta.color}22, 0 20px 60px ${meta.color}18, 0 8px 32px rgba(0,0,0,0.5)`
          : "0 4px 24px rgba(0,0,0,0.35)",
        transition: "border 0.3s ease, box-shadow 0.3s ease",
        fontFamily: "'DM Sans', sans-serif",
      }}
    >
      {/* Glow top-edge line */}
      <motion.div
        animate={{ opacity: hovered ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        className="absolute top-0 left-0 w-full h-[2px] pointer-events-none"
        style={{
          background: `linear-gradient(90deg, transparent, ${meta.color}, transparent)`,
        }}
      />

      {/* TAG BADGE */}
      <div className="absolute top-3 left-3 z-20">
        <span
          className="text-[10px] font-semibold tracking-widest uppercase px-2.5 py-1 rounded-full"
          style={{
            background: meta.tagBg,
            color: meta.color,
            border: `1px solid ${meta.color}33`,
          }}
        >
          {meta.tag}
        </span>
      </div>

      {/* USE TEMPLATE pill — visible on hover */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: hovered ? 1 : 0, y: hovered ? 0 : 8 }}
        transition={{ duration: 0.25 }}
        className="absolute top-3 right-3 z-20"
      >
        <span
          className="text-[10px] font-semibold tracking-wide px-2.5 py-1 rounded-full"
          style={{
            background: meta.color,
            color: "#0a0a0f",
          }}
        >
          Use this →
        </span>
      </motion.div>

      {/* PREVIEW AREA */}
      <div
        className="relative w-full overflow-hidden flex items-start justify-center"
        style={{
          height: "260px",
          background: "rgba(255,255,255,0.03)",
          borderBottom: "1px solid rgba(255,255,255,0.06)",
        }}
      >
        {/* Subtle inner glow on hover */}
        <motion.div
          animate={{ opacity: hovered ? 1 : 0 }}
          transition={{ duration: 0.4 }}
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `radial-gradient(ellipse at 50% 0%, ${meta.color}18 0%, transparent 70%)`,
          }}
        />

        <motion.div
          animate={{ scale: hovered ? 0.47 : 0.43 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="origin-top pointer-events-none mt-2"
        >
          <Template data={data} />
        </motion.div>
      </div>

      {/* FOOTER */}
      <div className="flex items-center justify-between px-4 py-3.5">
        <div>
          <p
            className="text-[11px] font-semibold tracking-[0.18em] uppercase mb-0.5"
            style={{ color: meta.color }}
          >
            Template
          </p>
          <h3
            className="text-base font-bold capitalize text-white leading-tight"
            style={{ fontFamily: "'Syne', sans-serif" }}
          >
            {templateId.replace("-", " ")}
          </h3>
        </div>

        {/* Arrow button */}
        <motion.div
          animate={{
            x: hovered ? 2 : 0,
            background: hovered ? meta.color : "rgba(255,255,255,0.07)",
          }}
          transition={{ duration: 0.25 }}
          className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0"
          style={{ border: `1px solid ${hovered ? meta.color : "rgba(255,255,255,0.1)"}` }}
        >
          <svg
            width="14"
            height="14"
            viewBox="0 0 14 14"
            fill="none"
            style={{ color: hovered ? "#0a0a0f" : "#ffffff" }}
          >
            <path
              d="M2 7h10M8 3l4 4-4 4"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default TemplatePreviewCard;