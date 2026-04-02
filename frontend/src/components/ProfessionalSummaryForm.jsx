import api from "@/configs/api";
import { Loader2, Sparkles } from "lucide-react";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";

const ProfessionalSummaryForm = ({ data, onChange, setResumeData }) => {

  const { token } = useSelector(state => state.auth)
  const [isGenerating, setIsGenerating] = useState(false)

  const generateSummary = async () => {
    try {
      setIsGenerating(true)
      const prompt = `enhance my professional summary "${data}"`
      const response = await api.post('/api/ai/enhance-pro-sum', { userContent: prompt }, { headers: { Authorization: token } })
      setResumeData(prev => ({ ...prev, professional_summary: response.data.enhancedContent }))
    } catch (error) {
      toast.error(error?.response?.data?.message || error.message)
    } finally {
      setIsGenerating(false)
    }
  }

  return (
    <div className="space-y-4 dark:bg-black">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="flex items-center gap-2 text-lg font-semibold text-gray-900 dark:text-white">
            Professional Summary
          </h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Add summary for your resume here
          </p>
        </div>

        <button
          disabled={isGenerating}
          onClick={generateSummary}
          className="flex items-center gap-2 px-3 py-1 text-sm 
          bg-purple-100 dark:bg-purple-500/20 
          text-purple-700 dark:text-purple-300 
          rounded hover:bg-purple-200 dark:hover:bg-purple-500/30 
          transition-colors disabled:opacity-50"
        >
          {isGenerating ? (<Loader2 className="size-4 animate-spin" />) : (<Sparkles className="size-4" />)}
          {isGenerating ? "Enhancing..." : "AI enhance"}
        </button>
      </div>

      <div className="mt-6">
        <textarea
          value={data || ""}
          onChange={(e) => onChange(e.target.value)}
          rows={7}
          className="w-full p-3 px-4 mt-2 text-sm rounded-lg outline-none resize-none transition-colors
          border border-gray-300 dark:border-white/10
          bg-white dark:bg-white/10
          text-gray-900 dark:text-white
          placeholder-gray-400 dark:placeholder-gray-500
          focus:ring focus:ring-blue-500 dark:focus:ring-blue-400
          focus:border-blue-500 dark:focus:border-blue-400"
          placeholder="Write a compelling professional summary that highlights your key strengths and career objectives..."
        />
        <p className="text-xs text-gray-500 dark:text-gray-400 max-w-4/5 mx-auto text-center">
          Tip: keep it concise and focus on your most relevant achievements and skills
        </p>
      </div>
    </div>
  );
};

export default ProfessionalSummaryForm;