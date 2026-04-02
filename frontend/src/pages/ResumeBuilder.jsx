import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  ArrowLeftIcon,
  Briefcase,
  ChevronLeft,
  ChevronRight,
  DownloadIcon,
  EyeIcon,
  EyeOffIcon,
  FileText,
  FolderIcon,
  GraduationCap,
  Share2Icon,
  Sparkles,
  Target,
  User,
} from "lucide-react";

import PersonalInfoForm from "../components/PersonalInfoForm";
import ResumePreview from "../components/ResumePreview";
import TemplateSelector from "../components/TemplateSelector";
import ColorPicker from "../components/ColorPicker";
import ProfessionalSummaryForm from "../components/ProfessionalSummaryForm";
import ExperienceForm from "../components/ExperienceForm";
import EducationForm from "../components/EducationForm";
import ProjectForm from "../components/ProjectForm";
import SkillsForm from "../components/SkillsForm";
import ATSScoreModal from "@/ATS/ATSScoreModal";
import { useSelector } from "react-redux";
import api from "@/configs/api";
import toast from "react-hot-toast";

const ResumeBuilder = () => {
  const { resumeId } = useParams();
  const { token } = useSelector((state) => state.auth);

  const [resumeData, setResumeData] = useState({
    _id: "",
    title: "",
    personal_info: {},
    professional_summary: "",
    experience: [],
    education: [],
    project: [],
    skills: [],
    template: "classic",
    accent_color: "red",
    public: false,
  });

  const [activeSectionIndex, setActiveSectionIndex] = useState(0);
  const [removeBackground, setRemoveBackground] = useState(false);
  const [showATSModal, setShowATSModal] = useState(false);

  const sections = [
    { id: "personal", name: "Personal Info", icon: User },
    { id: "summary", name: "Summary", icon: FileText },
    { id: "experience", name: "Experience", icon: Briefcase },
    { id: "education", name: "Education", icon: GraduationCap },
    { id: "projects", name: "Projects", icon: FolderIcon },
    { id: "skills", name: "Skills", icon: Sparkles },
  ];

  const activeSection = sections[activeSectionIndex];

  const normalizeResumeData = (r) => ({
    ...r,
    personal_info: r.personal_info || r.presonal_info || {},
    project: r.projects || r.project || [],
    skills:
      typeof r.skills === "string"
        ? r.skills.split(",").map((s) => s.trim()).filter(Boolean)
        : Array.isArray(r.skills)
        ? r.skills
        : [],
  });

  const loadExistingResume = async () => {
    try {
      const { data } = await api.get("/api/resumes/get/" + resumeId);
      if (data.resume) {
        setResumeData(normalizeResumeData(data.resume));
        document.title = data.resume.title;
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    loadExistingResume();
  }, []);

  const changeResumeVisibility = async () => {
    try {
      const formData = new FormData();
      formData.append("resumeId", resumeId);
      formData.append("resumeData", JSON.stringify({ public: !resumeData.public }));

      const { data } = await api.put("/api/resumes/update", formData);
      setResumeData((prev) => ({ ...prev, public: !prev.public }));
      toast.success(data.message);
    } catch (error) {
      console.error("error changing visibility:", error);
      toast.error(error?.response?.data?.message || error.message);
    }
  };

  const handleShare = () => {
    const frontendUrl = window.location.href.split("/app/")[0];
    const resumeUrl = frontendUrl + "/view/" + resumeId;

    if (navigator.share) {
      navigator.share({ url: resumeUrl, text: "My Resume" });
    } else {
      alert("share not supported on this browser");
    }
  };

  const downloadResume = () => {
    window.print();
  };

  const saveResume = async () => {
    let updatedResumeData = JSON.parse(JSON.stringify(resumeData));

    delete updatedResumeData.presonal_info;

    updatedResumeData.skills = Array.isArray(updatedResumeData.skills)
      ? updatedResumeData.skills.filter((s) => typeof s === "string" && s.trim())
      : [];

    updatedResumeData.projects = updatedResumeData.project || [];
    delete updatedResumeData.project;

    if (typeof resumeData.personal_info?.image === "object") {
      delete updatedResumeData.personal_info.image;
    }

    const formData = new FormData();
    formData.append("resumeId", resumeId);
    formData.append("resumeData", JSON.stringify(updatedResumeData));

    if (removeBackground) {
      formData.append("removeBackground", "yes");
    }

    if (typeof resumeData.personal_info?.image === "object") {
      formData.append("image", resumeData.personal_info.image);
    }

    const { data } = await api.put("/api/resumes/update", formData);
    setResumeData(normalizeResumeData(data.resume));
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-black transition-colors">

      {/* TOP NAV */}
      <div className="max-w-7xl mx-auto px-4 py-6">
        <Link
          to={"/app"}
          className="inline-flex gap-2 items-center text-slate-500 dark:text-slate-400
          hover:text-slate-700 dark:hover:text-slate-200 transition-colors"
        >
          <ArrowLeftIcon className="size-4" /> Back to Dashboard
        </Link>
      </div>

      <div className="max-w-7xl mx-auto px-4 pb-8 h-[calc(100vh-80px)]">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 h-full">

          {/* LEFT PANEL */}
          <div className="relative lg:col-span-4 h-full">
            <div className="relative bg-white dark:bg-gray-900 rounded-lg shadow-sm
            border border-gray-200 dark:border-white/10
            p-6 pt-1 h-full overflow-y-auto">

              {/* Progress bar track */}
              <hr className="absolute top-0 left-0 right-0 border-2 border-gray-200 dark:border-white/10" />
              {/* Progress bar fill */}
              <hr
                className="absolute top-0 left-0 h-1 bg-gradient-to-r from-green-500 to-green-600 border-none transition-all duration-500"
                style={{
                  width: `${((activeSectionIndex + 1) / sections.length) * 100}%`,
                }}
              />

              {/* SECTION NAV */}
              <div className="flex justify-between items-center mb-4
              border-b border-gray-200 dark:border-white/10 pb-3">
                <div className="flex items-center gap-1">
                  <TemplateSelector
                    selectedTemplate={resumeData.template}
                    onChange={(template) =>
                      setResumeData((prev) => ({ ...prev, template }))
                    }
                  />
                  <ColorPicker
                    SelectedColor={resumeData.accent_color}
                    onChange={(color) =>
                      setResumeData((prev) => ({ ...prev, accent_color: color }))
                    }
                  />
                </div>

                <div className="flex items-center gap-2">
                  {activeSectionIndex !== 0 && (
                    <button
                      onClick={() =>
                        setActiveSectionIndex((prev) => Math.max(prev - 1, 0))
                      }
                      className="flex items-center gap-1 text-sm
                      text-gray-500 dark:text-gray-400
                      hover:text-gray-700 dark:hover:text-white transition-colors"
                    >
                      <ChevronLeft className="size-4" /> Previous
                    </button>
                  )}
                  <button
                    onClick={() =>
                      setActiveSectionIndex((prev) =>
                        Math.min(prev + 1, sections.length - 1)
                      )
                    }
                    className={`flex items-center gap-1 text-sm
                    text-gray-500 dark:text-gray-400
                    hover:text-gray-700 dark:hover:text-white transition-colors
                    ${activeSectionIndex === sections.length - 1 && "opacity-50 pointer-events-none"}`}
                  >
                    Next <ChevronRight className="size-4" />
                  </button>
                </div>
              </div>

              {/* ACTIVE FORM */}
              <div className="space-y-6">
                {activeSection.id === "personal" && (
                  <PersonalInfoForm
                    data={resumeData.personal_info}
                    onChange={(data) =>
                      setResumeData((prev) => ({
                        ...prev,
                        personal_info: { ...prev.personal_info, ...data },
                      }))
                    }
                    removeBackground={removeBackground}
                    setRemoveBackground={setRemoveBackground}
                  />
                )}
                {activeSection.id === "summary" && (
                  <ProfessionalSummaryForm
                    data={resumeData.professional_summary}
                    onChange={(data) =>
                      setResumeData((prev) => ({
                        ...prev,
                        professional_summary: data,
                      }))
                    }
                    setResumeData={setResumeData}
                  />
                )}
                {activeSection.id === "experience" && (
                  <ExperienceForm
                    data={resumeData.experience}
                    onChange={(data) =>
                      setResumeData((prev) => ({ ...prev, experience: data }))
                    }
                  />
                )}
                {activeSection.id === "education" && (
                  <EducationForm
                    data={resumeData.education}
                    onChange={(data) =>
                      setResumeData((prev) => ({ ...prev, education: data }))
                    }
                  />
                )}
                {activeSection.id === "projects" && (
                  <ProjectForm
                    data={resumeData.project}
                    onChange={(data) =>
                      setResumeData((prev) => ({ ...prev, project: data }))
                    }
                  />
                )}
                {activeSection.id === "skills" && (
                  <SkillsForm
                    data={resumeData.skills}
                    onChange={(data) =>
                      setResumeData((prev) => ({ ...prev, skills: data }))
                    }
                  />
                )}
              </div>

              {/* SAVE BUTTON */}
              <button
                onClick={() =>
                  toast.promise(saveResume(), {
                    loading: "Saving...",
                    success: "Saved successfully!",
                    error: (err) =>
                      err?.response?.data?.message || "Failed to save",
                  })
                }
                className="mt-3 px-4 py-2 text-sm font-medium text-white
                bg-green-600 hover:bg-green-700
                dark:bg-green-600 dark:hover:bg-green-500
                rounded-lg shadow
                focus:outline-none focus:ring-2 focus:ring-green-500
                dark:focus:ring-green-400 focus:ring-offset-2
                dark:focus:ring-offset-gray-900
                transition"
              >
                Save Changes
              </button>
            </div>
          </div>

          {/* RIGHT PANEL */}
          <div className="col-span-8">
            <div className="relative w-full">
              <div className="absolute bottom-3 left-0 right-0 flex items-center justify-end gap-2 z-10">

                {/* ✅ ATS Score Button — NEW */}
                <button
                  onClick={() => setShowATSModal(true)}
                  className="flex items-center p-2 px-4 gap-2 text-xs rounded-lg
                  bg-gradient-to-br from-orange-100 to-orange-200 text-orange-600 ring-orange-300
                  dark:from-orange-500/10 dark:to-orange-500/20 dark:text-orange-300 dark:ring-orange-400/30
                  hover:ring transition-colors"
                >
                  <Target className="size-4" /> ATS Score
                </button>

                {/* Share */}
                {resumeData.public && (
                  <button
                    onClick={handleShare}
                    className="flex items-center p-2 px-4 gap-2 text-xs rounded-lg
                    bg-gradient-to-br from-blue-100 to-blue-200 text-blue-600 ring-blue-300
                    dark:from-blue-500/10 dark:to-blue-500/20 dark:text-blue-300 dark:ring-blue-400/30
                    hover:ring transition-colors"
                  >
                    <Share2Icon className="size-4" /> Share
                  </button>
                )}

                {/* Visibility */}
                <button
                  onClick={changeResumeVisibility}
                  className="flex items-center p-2 px-4 gap-2 text-xs rounded-lg
                  bg-gradient-to-br from-purple-100 to-purple-200 text-purple-600 ring-purple-300
                  dark:from-purple-500/10 dark:to-purple-500/20 dark:text-purple-300 dark:ring-purple-400/30
                  hover:ring transition-colors"
                >
                  {resumeData.public ? (
                    <EyeIcon className="size-4" />
                  ) : (
                    <EyeOffIcon className="size-4" />
                  )}
                  {resumeData.public ? "Public" : "Private"}
                </button>

                {/* Download */}
                <button
                  onClick={downloadResume}
                  className="flex items-center gap-2 px-6 py-2 text-xs rounded-lg
                  bg-gradient-to-br from-green-100 to-green-200 text-green-600 ring-green-300
                  dark:from-green-500/10 dark:to-green-500/20 dark:text-green-300 dark:ring-green-400/30
                  hover:ring transition-colors"
                >
                  <DownloadIcon className="size-4" /> Download
                </button>
              </div>
            </div>

            {/* PREVIEW PANEL */}
            <div className="bg-white dark:bg-gray-900 rounded-lg shadow-sm
            border border-gray-200 dark:border-white/10
            h-full overflow-y-auto p-4">
              <ResumePreview
                data={resumeData}
                template={resumeData.template}
                accentColor={resumeData.accent_color}
              />
            </div>
          </div>

        </div>
      </div>

      {/* ✅ ATS Score Modal */}
      {showATSModal && (
        <ATSScoreModal
          resumeData={resumeData}
          onClose={() => setShowATSModal(false)}
        />
      )}

    </div>
  );
};

export default ResumeBuilder;