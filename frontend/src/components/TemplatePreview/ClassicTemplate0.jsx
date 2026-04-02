const ClassicTemplate = ({ data }) => {
  if (!data) return null;

  const {
    personal_info,
    skills,
    experience,
    education,
    professional_summary,
  } = data;

  return (
    <div className="w-full max-w-[800px] mx-auto bg-white text-black p-8">

      {/* HEADER */}
      <div className="text-center border-b pb-4 mb-4">
        <h1 className="text-2xl font-bold uppercase">
          {personal_info?.full_name}
        </h1>

        <p className="text-sm text-gray-600 mt-1">
          {personal_info?.email} | {personal_info?.phone}
        </p>

        <p className="text-sm text-gray-500">
          {personal_info?.location}
        </p>
      </div>

      {/* SUMMARY */}
      <div className="mb-4">
        <h2 className="text-sm font-bold uppercase border-b pb-1">
          Professional Summary
        </h2>
        <p className="text-sm mt-2">
          {professional_summary}
        </p>
      </div>

      {/* SKILLS */}
      <div className="mb-4">
        <h2 className="text-sm font-bold uppercase border-b pb-1">
          Skills
        </h2>

        <p className="text-sm mt-2">
          {skills?.join(", ")}
        </p>
      </div>

      {/* EXPERIENCE */}
      <div className="mb-4">
        <h2 className="text-sm font-bold uppercase border-b pb-1">
          Experience
        </h2>

        {experience?.map((exp, i) => (
          <div key={i} className="mt-3 text-sm">
            <p className="font-semibold">
              {exp.position}
            </p>

            <p className="text-gray-600">
              {exp.company}
            </p>

            <p className="text-xs text-gray-400">
              {exp.start_date} - {exp.is_current ? "Present" : exp.end_date}
            </p>

            <p className="mt-1 text-gray-700">
              {exp.description}
            </p>
          </div>
        ))}
      </div>

      {/* EDUCATION */}
      <div>
        <h2 className="text-sm font-bold uppercase border-b pb-1">
          Education
        </h2>

        {education?.map((edu, i) => (
          <div key={i} className="mt-3 text-sm">
            <p className="font-semibold">
              {edu.degree} in {edu.field}
            </p>

            <p className="text-gray-600">
              {edu.institution}
            </p>

            <p className="text-xs text-gray-400">
              {edu.graduation_date}
            </p>
          </div>
        ))}
      </div>

    </div>
  );
};

export default ClassicTemplate;