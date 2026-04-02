import { Plus, Trash2 } from "lucide-react";
import React from "react";

const ProjectForm = ({ data = [], onChange }) => {
  const newProject = () => {
    const newProjectData = {
      name: "",
      type: "",
      description: "",
      technologies: "",
      github: "",
      live: "",
      duration: "",
      role: "",
      achievements: "",
    };
    onChange([...data, newProjectData]);
  };

  const removeProject = (index) => {
    const updated = data.filter((_, i) => i !== index);
    onChange(updated);
  };

  const updateProject = (index, field, value) => {
    const updated = [...data];
    updated[index] = { ...updated[index], [field]: value };
    onChange(updated);
  };

  const inputStyle =
    "w-full px-3 py-2 text-sm border border-gray-300 rounded-lg outline-none transition focus:ring-2 focus:ring-blue-500 focus:border-blue-500";

  return (
    <div className="space-y-6">
      {/* HEADER */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">Projects</h3>
          <p className="text-sm text-gray-500">
            Add your project details
          </p>
        </div>

        <button
          onClick={newProject}
          className="flex items-center gap-2 px-3 py-1.5 text-sm bg-purple-100 text-purple-700 rounded-lg hover:bg-purple-200 transition-all shadow-sm"
        >
          <Plus className="size-4" />
          Add Project
        </button>
      </div>

      {/* EMPTY STATE */}
      {data.length === 0 ? (
        <p className="text-gray-500 text-sm text-center py-6">
          No projects added yet.
        </p>
      ) : (
        <div className="space-y-4">
          {data.map((project, index) => (
            <div
              key={index}
              className="p-5 border border-gray-200 rounded-xl space-y-4 bg-white shadow-sm hover:shadow-md transition-all"
            >
              {/* TOP */}
              <div className="flex justify-between items-start">
                <h4 className="text-sm font-semibold text-gray-800">
                  Project #{index + 1}
                </h4>

                <button
                  onClick={() => removeProject(index)}
                  className="text-red-500 hover:text-red-700 hover:bg-red-50 p-1 rounded"
                >
                  <Trash2 className="size-4" />
                </button>
              </div>

              {/* ROW 1 */}
              <div className="grid md:grid-cols-2 gap-3">
                <input
                  value={project.name || ""}
                  onChange={(e) =>
                    updateProject(index, "name", e.target.value)
                  }
                  type="text"
                  placeholder="Project Name"
                  className={inputStyle}
                />

                <input
                  value={project.type || ""}
                  onChange={(e) =>
                    updateProject(index, "type", e.target.value)
                  }
                  type="text"
                  placeholder="Project Type (Web, ML, App...)"
                  className={inputStyle}
                />
              </div>

              {/* ROW 2 */}
              <div className="grid md:grid-cols-2 gap-3">
                <input
                  value={project.github || ""}
                  onChange={(e) =>
                    updateProject(index, "github", e.target.value)
                  }
                  type="text"
                  placeholder="GitHub Link"
                  className={inputStyle}
                />

                <input
                  value={project.live || ""}
                  onChange={(e) =>
                    updateProject(index, "live", e.target.value)
                  }
                  type="text"
                  placeholder="Live Demo Link"
                  className={inputStyle}
                />
              </div>

              {/* ROW 3 */}
              <input
                value={project.technologies || ""}
                onChange={(e) =>
                  updateProject(index, "technologies", e.target.value)
                }
                type="text"
                placeholder="Technologies (React, Node, MongoDB...)"
                className={inputStyle}
              />

              {/* ROW 4 */}
              <div className="grid md:grid-cols-2 gap-3">
                <input
                  value={project.duration || ""}
                  onChange={(e) =>
                    updateProject(index, "duration", e.target.value)
                  }
                  type="text"
                  placeholder="Duration (Jan 2024 - Mar 2024)"
                  className={inputStyle}
                />

                <input
                  value={project.role || ""}
                  onChange={(e) =>
                    updateProject(index, "role", e.target.value)
                  }
                  type="text"
                  placeholder="Your Role (Frontend Developer)"
                  className={inputStyle}
                />
              </div>

              {/* DESCRIPTION */}
              <textarea
                rows={3}
                value={project.description || ""}
                onChange={(e) =>
                  updateProject(index, "description", e.target.value)
                }
                placeholder="Project Description"
                className={inputStyle}
              />

              {/* ACHIEVEMENTS */}
              <textarea
                rows={2}
                value={project.achievements || ""}
                onChange={(e) =>
                  updateProject(index, "achievements", e.target.value)
                }
                placeholder="Key Achievements (Optional)"
                className={inputStyle}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProjectForm;