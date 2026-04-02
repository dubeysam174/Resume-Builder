import React, { useState } from "react";
import {
  X,
  Target,
  Loader2,
  CheckCircle2,
  XCircle,
  Lightbulb,
  ChevronRight,
  Sparkles,
} from "lucide-react";
import api from "@/configs/api";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";

// ── Circular Score Ring ───────────────────────────────────────────────────────
const ScoreRing = ({ score }) => {
  const radius = 54;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (score / 100) * circumference;

  const color =
    score >= 75
      ? { stroke: "#22c55e", text: "text-green-500", label: "Strong Match", bg: "bg-green-500/10 dark:bg-green-500/20" }
      : score >= 50
      ? { stroke: "#f59e0b", text: "text-amber-500", label: "Fair Match", bg: "bg-amber-500/10 dark:bg-amber-500/20" }
      : { stroke: "#ef4444", text: "text-red-500", label: "Weak Match", bg: "bg-red-500/10 dark:bg-red-500/20" };

  return (
    <div className="flex flex-col items-center gap-2">
      <div className="relative w-36 h-36">
        <svg className="w-full h-full -rotate-90" viewBox="0 0 128 128">
          {/* Track */}
          <circle
            cx="64" cy="64" r={radius}
            fill="none"
            stroke="currentColor"
            strokeWidth="10"
            className="text-gray-200 dark:text-white/10"
          />
          {/* Fill */}
          <circle
            cx="64" cy="64" r={radius}
            fill="none"
            stroke={color.stroke}
            strokeWidth="10"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            style={{ transition: "stroke-dashoffset 1s ease" }}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className={`text-3xl font-bold ${color.text}`}>{score}</span>
          <span className="text-xs text-gray-400 dark:text-gray-500 font-medium">/ 100</span>
        </div>
      </div>
      <span className={`text-xs font-semibold px-3 py-1 rounded-full ${color.text} ${color.bg}`}>
        {color.label}
      </span>
    </div>
  );
};

// ── Breakdown Bar ─────────────────────────────────────────────────────────────
const BreakdownBar = ({ label, value }) => {
  const color =
    value >= 75 ? "bg-green-500" : value >= 50 ? "bg-amber-500" : "bg-red-500";

  return (
    <div className="space-y-1">
      <div className="flex justify-between items-center text-xs">
        <span className="text-gray-600 dark:text-gray-400 font-medium">{label}</span>
        <span className="font-bold text-gray-800 dark:text-white">{value}%</span>
      </div>
      <div className="h-2 rounded-full bg-gray-100 dark:bg-white/10 overflow-hidden">
        <div
          className={`h-full rounded-full ${color} transition-all duration-700`}
          style={{ width: `${value}%` }}
        />
      </div>
    </div>
  );
};

// ── Main Modal ────────────────────────────────────────────────────────────────
const ATSScoreModal = ({ resumeData, onClose }) => {
  const { token } = useSelector((state) => state.auth);
  const [jobDescription, setJobDescription] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const analyze = async () => {
    if (!jobDescription.trim()) {
      toast.error("Please paste a job description first");
      return;
    }
    try {
      setLoading(true);
      setResult(null);
      const { data } = await api.post(
        "/api/ai/ats-score",
        { resumeData, jobDescription },
        { headers: { Authorization: token } }
      );
      setResult(data);
    } catch (error) {
      toast.error(error?.response?.data?.message || error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    // Backdrop
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4
      bg-black/50 dark:bg-black/70 backdrop-blur-sm"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      {/* Modal */}
      <div
        className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl
        bg-white dark:bg-gray-900
        border border-gray-200 dark:border-white/10
        shadow-2xl"
      >
        {/* Header */}
        <div className="sticky top-0 z-10 flex items-center justify-between px-6 py-4
          bg-white dark:bg-gray-900
          border-b border-gray-100 dark:border-white/10">
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-lg bg-orange-100 dark:bg-orange-500/20">
              <Target className="size-4 text-orange-600 dark:text-orange-400" />
            </div>
            <h2 className="text-base font-semibold text-gray-900 dark:text-white">
              ATS Score Analyzer
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-gray-400 hover:text-gray-600
            hover:bg-gray-100 dark:hover:bg-white/10 dark:hover:text-white transition"
          >
            <X className="size-4" />
          </button>
        </div>

        <div className="p-6 space-y-6">

          {/* Job Description Input */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Paste Job Description
            </label>
            <textarea
              rows={5}
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
              placeholder="Paste the full job description here..."
              className="w-full px-4 py-3 text-sm rounded-xl outline-none resize-none transition-colors
              bg-gray-50 dark:bg-white/5
              border border-gray-200 dark:border-white/10
              text-gray-900 dark:text-white
              placeholder-gray-400 dark:placeholder-gray-500
              focus:ring-2 focus:ring-orange-400 dark:focus:ring-orange-500
              focus:border-orange-400 dark:focus:border-orange-500"
            />
            <button
              onClick={analyze}
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 py-2.5 text-sm font-medium
              rounded-xl transition-all
              bg-orange-500 hover:bg-orange-600 dark:bg-orange-500 dark:hover:bg-orange-400
              text-white disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <><Loader2 className="size-4 animate-spin" /> Analyzing...</>
              ) : (
                <><Sparkles className="size-4" /> Analyze Resume</>
              )}
            </button>
          </div>

          {/* Results */}
          {result && (
            <div className="space-y-6 animate-in fade-in duration-300">

              {/* Score + Breakdown */}
              <div className="flex flex-col sm:flex-row gap-6 p-5 rounded-xl
                bg-gray-50 dark:bg-white/5
                border border-gray-100 dark:border-white/10">

                {/* Ring */}
                <div className="flex justify-center sm:justify-start">
                  <ScoreRing score={result.overall_score} />
                </div>

                {/* Bars */}
                <div className="flex-1 space-y-3 justify-center flex flex-col">
                  <BreakdownBar label="Keyword Match" value={result.breakdown.keyword_match} />
                  <BreakdownBar label="Skills Match" value={result.breakdown.skills_match} />
                  <BreakdownBar label="Experience Relevance" value={result.breakdown.experience_relevance} />
                  <BreakdownBar label="Formatting" value={result.breakdown.formatting} />
                </div>
              </div>

              {/* Keywords */}
              <div className="grid sm:grid-cols-2 gap-4">

                {/* Matched */}
                <div className="p-4 rounded-xl space-y-3
                  bg-green-50 dark:bg-green-500/5
                  border border-green-100 dark:border-green-500/20">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="size-4 text-green-500" />
                    <span className="text-sm font-semibold text-green-700 dark:text-green-400">
                      Matched Keywords
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {result.matched_keywords.map((kw) => (
                      <span
                        key={kw}
                        className="px-2.5 py-1 text-xs font-medium rounded-full
                        bg-green-100 dark:bg-green-500/20
                        text-green-700 dark:text-green-300"
                      >
                        {kw}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Missing */}
                <div className="p-4 rounded-xl space-y-3
                  bg-red-50 dark:bg-red-500/5
                  border border-red-100 dark:border-red-500/20">
                  <div className="flex items-center gap-2">
                    <XCircle className="size-4 text-red-500" />
                    <span className="text-sm font-semibold text-red-700 dark:text-red-400">
                      Missing Keywords
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {result.missing_keywords.map((kw) => (
                      <span
                        key={kw}
                        className="px-2.5 py-1 text-xs font-medium rounded-full
                        bg-red-100 dark:bg-red-500/20
                        text-red-700 dark:text-red-300"
                      >
                        {kw}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Suggestions */}
              <div className="p-4 rounded-xl space-y-3
                bg-blue-50 dark:bg-blue-500/5
                border border-blue-100 dark:border-blue-500/20">
                <div className="flex items-center gap-2">
                  <Lightbulb className="size-4 text-blue-500" />
                  <span className="text-sm font-semibold text-blue-700 dark:text-blue-400">
                    Suggestions to Improve
                  </span>
                </div>
                <ul className="space-y-2">
                  {result.suggestions.map((s, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-gray-700 dark:text-gray-300">
                      <ChevronRight className="size-4 mt-0.5 shrink-0 text-blue-400" />
                      {s}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Verdict */}
              <div className="p-4 rounded-xl
                bg-gray-50 dark:bg-white/5
                border border-gray-200 dark:border-white/10">
                <p className="text-sm text-gray-600 dark:text-gray-400 italic">
                  💬 {result.verdict}
                </p>
              </div>

            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ATSScoreModal;