import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

import ModernTemplate from "./ModernTemplate1";
import ClassicTemplate from "./ClassicTemplate0";
import MinimalImageTemplate from "./MinimalImageTemplate0";

const templateMap = {
  modern: ModernTemplate,
  classic: ClassicTemplate,
  "minimal-image": MinimalImageTemplate,
};

const templateMeta = {
  modern: { label: "Modern", color: "#2563eb" },
  classic: { label: "Classic", color: "#1e293b" },
  "minimal-image": { label: "Minimal Image", color: "#0f766e" },
};

const TemplatePreviewModal = ({ preview, onClose }) => {
  const navigate = useNavigate();

  // ── Close on Escape key ──────────────────────────────────────────────────
  useEffect(() => {
    if (!preview) return;
    const handler = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [preview, onClose]);

  // ── Lock body scroll while open ──────────────────────────────────────────
  useEffect(() => {
    if (!preview) return;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, [preview]);

  if (!preview) return null;

  const { templateId, data } = preview;
  const Template = templateMap[templateId];
  const meta = templateMeta[templateId] ?? { label: templateId, color: "#2563eb" };

  if (!Template) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      role="dialog"
      aria-modal="true"
      aria-label={`${meta.label} template preview`}
    >
      {/* ── Backdrop ── */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* ── Modal shell ── */}
      <div
        className="relative z-10 flex flex-col bg-white rounded-2xl shadow-2xl overflow-hidden"
        style={{ width: "min(92vw, 860px)", height: "min(92vh, 960px)" }}
      >

        {/* ── Header ── */}
        <div
          className="flex items-center justify-between px-6 py-4 shrink-0"
          style={{ borderBottom: "1px solid #f1f5f9" }}
        >
          <div className="flex items-center gap-3">
            {/* Color dot */}
            <span
              className="w-3 h-3 rounded-full"
              style={{ background: meta.color }}
            />
            <span className="text-sm font-semibold text-gray-800">
              {meta.label}
            </span>
            <span
              className="text-xs font-medium px-2.5 py-0.5 rounded-full"
              style={{ background: `${meta.color}18`, color: meta.color }}
            >
              Preview
            </span>
          </div>

          {/* Close */}
          <button
            onClick={onClose}
            aria-label="Close preview"
            className="w-8 h-8 flex items-center justify-center rounded-full text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors duration-150"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path
                d="M2 2l12 12M14 2L2 14"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </div>

        {/* ── Scrollable template area ── */}
        <div className="flex-1 overflow-y-auto bg-gray-50 px-6 py-6">
          {/* 
            Wrap in A4-like container so the template renders at its
            intended width and doesn't stretch to fill the modal.
          */}
          <div
            className="mx-auto bg-white shadow-md rounded-lg overflow-hidden"
            style={{ width: "794px", minHeight: "1123px" }}
          >
            <Template data={data} />
          </div>
        </div>

        {/* ── Footer CTA ── */}
        <div
          className="flex items-center justify-between px-6 py-4 shrink-0 bg-white"
          style={{ borderTop: "1px solid #f1f5f9" }}
        >
          <p className="text-sm text-gray-500">
            Looks good? Start building with this layout.
          </p>

          <div className="flex items-center gap-3">
            <button
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-gray-600 rounded-lg hover:bg-gray-100 transition-colors duration-150"
            >
              Back
            </button>

            <button
              onClick={() => navigate(`/builder?template=${templateId}`)}
              className="px-5 py-2 text-sm font-semibold text-white rounded-lg transition-all duration-150 active:scale-95"
              style={{ background: meta.color }}
            >
              Use This Template →
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default TemplatePreviewModal;