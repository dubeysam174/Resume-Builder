import React from "react";
import ClassicTemplate from "./templates/ClassicTemplate";
import ModernTemplate from "./templates/ModernTemplate";
import MinimalImageTemplate from "./templates/MinimalImageTemplate";
import MinimalTemplate from "./templates/MinimalTemplate";

const ResumePreview = ({
  data = {},
  template,
  accentColor,
  classes = "",
}) => {

  const formattedData = {
    personal_info: {
      full_name: data.personal_info?.full_name || "",
      email: data.personal_info?.email || "",
      phone: data.personal_info?.phone || "",
      location: data.personal_info?.location || "",
      profession: data.personal_info?.profession || "",
      linkedin: data.personal_info?.linkedin || "",
      website: data.personal_info?.website || "",
      image: data.personal_info?.image || null,
    },
    professional_summary: data.professional_summary || "",
    skills: Array.isArray(data.skills) ? data.skills : [],
    experience: Array.isArray(data.experience) ? data.experience : [],
    education: Array.isArray(data.education) ? data.education : [],
    project: Array.isArray(data.project) ? data.project : [],
  };

  const renderTemplate = () => {
    switch (template) {
      case "modern":
        return <ModernTemplate data={formattedData} accentColor={accentColor} />;
      case "minimal-image":
        return <MinimalImageTemplate data={formattedData} accentColor={accentColor} />;
      case "minimal":
        return <MinimalTemplate data={formattedData} accentColor={accentColor} />;
      default:
        return <ClassicTemplate data={formattedData} accentColor={accentColor} />;
    }
  };

  return (
    <div className={`w-full ${classes} dark:bg-black`}>
      <div
        id="resume-preview"
        className="bg-white border border-gray-200 shadow-sm dark:bg-black"
      >
        {renderTemplate()}
      </div>

      <style>{`
        @page {
          size: letter;
          margin: 0;
        }

        @media print {
          html,
          body {
            width: 8.5in;
            height: 11in;
            overflow: hidden;
          }

          body * {
            visibility: hidden;
          }

          #resume-preview,
          #resume-preview * {
            visibility: visible;
          }

          #resume-preview {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
          }
        }
      `}</style>
    </div>
  );
};

export default ResumePreview;