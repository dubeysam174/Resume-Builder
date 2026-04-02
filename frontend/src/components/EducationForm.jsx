import { GraduationCap, Plus, Trash2 } from "lucide-react";
import React from "react";

const inputClass = `
  w-full px-3 py-2 text-sm rounded-lg outline-none transition-colors
  bg-white dark:bg-white/10
  border border-gray-300 dark:border-white/10
  text-gray-900 dark:text-white
  placeholder-gray-400 dark:placeholder-gray-500
  focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400
  focus:border-blue-500 dark:focus:border-blue-400
`;

const EducationForm = ({ data, onChange }) => {
  const addEducation = () => {
    const newEducation = {
      institution: "",
      degree: "",
      field: "",
      graduation_date: "",
      gpa: "",
    };
    onChange([...data, newEducation]);
  };

  const removeEducation = (index) => {
    const updated = data.filter((_, i) => i !== index);
    onChange(updated);
  };

  const updateEducation = (index, field, value) => {
    const updated = [...data];
    updated[index] = { ...updated[index], [field]: value };
    onChange(updated);
  };

  return (
    <div className="space-y-6 text-gray-900 dark:text-gray-100">

      {/* HEADER */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="flex items-center gap-2 text-lg font-semibold text-gray-900 dark:text-white">
            Education
          </h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Add Your education details
          </p>
        </div>

        <button
          onClick={addEducation}
          className="flex items-center gap-2 px-3 py-1.5 text-sm rounded-lg
          bg-purple-100 text-purple-700 hover:bg-purple-200
          dark:bg-purple-500/10 dark:text-purple-300 dark:hover:bg-purple-500/20
          border border-transparent dark:border-purple-400/20
          transition-all shadow-sm"
        >
          <Plus className="size-4" />
          Add Education
        </button>
      </div>

      {/* EMPTY STATE */}
      {data.length === 0 ? (
        <div className="text-center py-8 text-gray-500 dark:text-gray-400">
          <GraduationCap className="w-12 h-12 mx-auto mb-3 text-gray-300 dark:text-gray-600" />
          <p>No education added yet.</p>
          <p className="text-sm">Click "Add Education" to get started.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {data.map((education, index) => (
            <div
              key={index}
              className="p-5 rounded-xl space-y-4
              bg-white dark:bg-white/5
              border border-gray-200 dark:border-white/10
              shadow-sm hover:shadow-md dark:shadow-none
              transition-all"
            >
              {/* TOP */}
              <div className="flex justify-between items-start">
                <h4 className="text-sm font-semibold text-gray-800 dark:text-white">
                  Education #{index + 1}
                </h4>

                <button
                  onClick={() => removeEducation(index)}
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
                  value={education.institution || ""}
                  onChange={(e) => updateEducation(index, "institution", e.target.value)}
                  type="text"
                  placeholder="Institution"
                  className={inputClass}
                />

                <input
                  value={education.degree || ""}
                  onChange={(e) => updateEducation(index, "degree", e.target.value)}
                  type="text"
                  placeholder="Degree"
                  className={inputClass}
                />

                <input
                  value={education.field || ""}
                  onChange={(e) => updateEducation(index, "field", e.target.value)}
                  type="text"
                  placeholder="Field of Study"
                  className={inputClass}
                />

                <input
                  value={education.graduation_date || ""}
                  onChange={(e) => updateEducation(index, "graduation_date", e.target.value)}
                  type="month"
                  className={inputClass}
                />
              </div>

              <input
                value={education.gpa || ""}
                onChange={(e) => updateEducation(index, "gpa", e.target.value)}
                type="text"
                placeholder="GPA (Optional)"
                className={inputClass}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default EducationForm;