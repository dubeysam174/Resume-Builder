import React, { useState } from "react";
import { Plus, Sparkles, Trash2, Briefcase, Loader2 } from "lucide-react";
import { useSelector } from "react-redux";
import api from "@/configs/api";
import toast from "react-hot-toast";

const inputClass = `
  w-full px-3 py-2 text-sm rounded-lg outline-none transition-colors
  bg-white dark:bg-white/10
  border border-gray-300 dark:border-white/10
  text-gray-900 dark:text-white
  placeholder-gray-400 dark:placeholder-gray-500
  focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400
  focus:border-blue-500 dark:focus:border-blue-400
`;

const ExperienceForm = ({ data, onChange }) => {
  const { token } = useSelector((state) => state.auth);
  const [generatingIndex, setGeneratingIndex] = useState(-1);

  const addExperience = () => {
    const newExperience = {
      company: "",
      position: "",
      start_date: "",
      end_date: "",
      description: "",
      is_current: false,
    };
    onChange([...data, newExperience]);
  };

  const removeExperience = (index) => {
    const updated = data.filter((_, i) => i !== index);
    onChange(updated);
  };

  const updateExperience = (index, field, value) => {
    const updated = [...data];
    updated[index] = { ...updated[index], [field]: value };
    onChange(updated);
  };

  const generateDescription = async (index) => {
    const experience = data[index];
    const prompt = experience.description
      ? `enhance this job description "${experience.description}" for the position of ${experience.position} at ${experience.company}.`
      : `write a professional job description for the position of ${experience.position} at ${experience.company}.`;

    try {
      setGeneratingIndex(index);
      const response = await api.post(
        "/api/ai/enhance-job-desc",
        { userContent: prompt },
        { headers: { Authorization: token } }
      );
      updateExperience(index, "description", response.data.enhancedContent);
    } catch (error) {
      toast.error(error?.response?.data?.message || error.message);
    } finally {
      setGeneratingIndex(-1);
    }
  };

  return (
    <div className="space-y-6 text-gray-900 dark:text-gray-100">

      {/* HEADER */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            Work Experience
          </h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Add your work experience here
          </p>
        </div>

        <button
          onClick={addExperience}
          className="flex items-center gap-2 px-3 py-1.5 text-sm rounded-lg
          bg-purple-100 text-purple-700 hover:bg-purple-200
          dark:bg-purple-500/10 dark:text-purple-300
          dark:hover:bg-purple-500/20
          border border-transparent dark:border-purple-400/20
          transition-all"
        >
          <Plus className="size-4" />
          Add Experience
        </button>
      </div>

      {/* EMPTY STATE */}
      {data.length === 0 ? (
        <div className="text-center py-8 text-gray-500 dark:text-gray-400">
          <Briefcase className="w-12 h-12 mx-auto mb-3 text-gray-300 dark:text-gray-600" />
          <p>No work experience added yet.</p>
          <p className="text-sm">Click "Add Experience" to get started.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {data.map((experience, index) => (
            <div
              key={index}
              className="p-5 rounded-xl space-y-4
              bg-white dark:bg-white/5
              backdrop-blur-xl
              border border-gray-200 dark:border-white/10
              shadow-sm hover:shadow-md dark:shadow-none
              transition-all"
            >

              {/* TOP */}
              <div className="flex justify-between items-start">
                <h4 className="text-sm font-semibold text-gray-800 dark:text-white">
                  Experience #{index + 1}
                </h4>

                <button
                  onClick={() => removeExperience(index)}
                  className="text-red-500 hover:text-red-600
                  hover:bg-red-50 dark:hover:bg-red-500/10
                  p-1 rounded transition"
                >
                  <Trash2 className="size-4" />
                </button>
              </div>

              {/* INPUTS */}
              <div className="grid md:grid-cols-2 gap-3">
                <input
                  value={experience.company || ""}
                  onChange={(e) => updateExperience(index, "company", e.target.value)}
                  placeholder="Company Name"
                  className={inputClass}
                />

                <input
                  value={experience.position || ""}
                  onChange={(e) => updateExperience(index, "position", e.target.value)}
                  placeholder="Job Title"
                  className={inputClass}
                />

                <input
                  value={experience.start_date || ""}
                  onChange={(e) => updateExperience(index, "start_date", e.target.value)}
                  type="month"
                  className={inputClass}
                />

                <input
                  value={experience.end_date || ""}
                  disabled={experience.is_current}
                  onChange={(e) => updateExperience(index, "end_date", e.target.value)}
                  type="month"
                  className={`${inputClass} disabled:opacity-50 disabled:cursor-not-allowed`}
                />
              </div>

              {/* CHECKBOX */}
              <label className="flex items-center gap-2 cursor-pointer text-gray-700 dark:text-gray-300">
                <input
                  type="checkbox"
                  checked={experience.is_current || false}
                  onChange={(e) => updateExperience(index, "is_current", e.target.checked)}
                  className="rounded border-gray-300 dark:border-white/20 text-blue-600 focus:ring-blue-500 dark:focus:ring-blue-400 dark:bg-white/10"
                />
                Currently working here
              </label>

              {/* DESCRIPTION */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Job Description
                  </label>

                  <button
                    onClick={() => generateDescription(index)}
                    disabled={
                      generatingIndex === index ||
                      !experience.position ||
                      !experience.company
                    }
                    className="flex items-center gap-1 px-2 py-1 text-xs rounded-md
                    bg-purple-100 text-purple-700 hover:bg-purple-200
                    dark:bg-purple-500/10 dark:text-purple-300
                    dark:hover:bg-purple-500/20
                    disabled:opacity-50 transition-colors"
                  >
                    {generatingIndex === index ? (
                      <Loader2 className="w-3 h-3 animate-spin" />
                    ) : (
                      <Sparkles className="w-3 h-3" />
                    )}
                    {generatingIndex === index ? "Enhancing..." : "Enhance with AI"}
                  </button>
                </div>

                <textarea
                  value={experience.description || ""}
                  onChange={(e) => updateExperience(index, "description", e.target.value)}
                  rows={4}
                  placeholder="Describe your key responsibilities and achievements..."
                  className={`${inputClass} resize-none`}
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ExperienceForm;