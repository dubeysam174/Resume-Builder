const ModernTemplate = ({ data }) => {
  if (!data) return null;

  const {
    personal_info,
    skills,
    experience,
    education,
    professional_summary,
  } = data;

  return (
    <div className="w-full max-w-[800px] mx-auto p-6 text-black">

      {/* HEADER */}
      <div className="mb-4">
        <h1 className="text-2xl font-bold">
          {personal_info?.full_name}
        </h1>
        <p className="text-gray-500">
          {personal_info?.profession}
        </p>
        <p className="text-sm text-gray-400">
          {personal_info?.email} | {personal_info?.phone}
        </p>
      </div>

      {/* SUMMARY */}
      <div className="mb-4">
        <h2 className="font-semibold">Summary</h2>
        <p className="text-sm">{professional_summary}</p>
      </div>

      {/* SKILLS */}
      <div className="mb-4">
        <h2 className="font-semibold">Skills</h2>
        <div className="flex flex-wrap gap-2 mt-2">
          {skills?.map((skill, i) => (
            <span key={i} className="bg-gray-200 px-2 py-1 text-xs rounded">
              {skill}
            </span>
          ))}
        </div>
      </div>

      {/* EXPERIENCE */}
      <div className="mb-4">
        <h2 className="font-semibold">Experience</h2>
        {experience?.map((exp, i) => (
          <div key={i} className="mt-2 text-sm">
            <p className="font-medium">{exp.position}</p>
            <p className="text-gray-500">{exp.company}</p>
          </div>
        ))}
      </div>

      {/* EDUCATION */}
      <div>
        <h2 className="font-semibold">Education</h2>
        {education?.map((edu, i) => (
          <p key={i} className="text-sm">
            {edu.degree} - {edu.institution}
          </p>
        ))}
      </div>

    </div>
  );
};

export default ModernTemplate;