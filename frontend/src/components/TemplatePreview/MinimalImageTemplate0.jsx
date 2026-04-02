const MinimalImageTemplate = ({ data }) => {
  if (!data) return null;

  const {
    personal_info,
    skills,
    experience,
    education,
    professional_summary,
  } = data;

  return (
    <div className="w-full max-w-[800px] mx-auto bg-white text-black p-6">

      {/* HEADER WITH IMAGE */}
      <div className="flex items-center gap-4 border-b pb-4">

        {/* IMAGE */}
        <img
          src={personal_info?.image}
          alt="profile"
          className="w-16 h-16 rounded-full object-cover"
        />

        {/* INFO */}
        <div>
          <h1 className="text-xl font-bold">
            {personal_info?.full_name}
          </h1>
          <p className="text-gray-500">
            {personal_info?.profession}
          </p>
          <p className="text-sm text-gray-400">
            {personal_info?.email}
          </p>
        </div>

      </div>

      {/* SUMMARY */}
      <div className="mt-4">
        <h2 className="text-sm font-semibold uppercase text-gray-600">
          Summary
        </h2>
        <p className="text-sm mt-1">
          {professional_summary}
        </p>
      </div>

      {/* SKILLS */}
      <div className="mt-4">
        <h2 className="text-sm font-semibold uppercase text-gray-600">
          Skills
        </h2>

        <div className="flex flex-wrap gap-2 mt-2">
          {skills?.map((skill, i) => (
            <span
              key={i}
              className="text-xs border px-2 py-1 rounded"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>

      {/* EXPERIENCE */}
      <div className="mt-4">
        <h2 className="text-sm font-semibold uppercase text-gray-600">
          Experience
        </h2>

        {experience?.map((exp, i) => (
          <div key={i} className="mt-2 text-sm">
            <p className="font-medium">{exp.position}</p>
            <p className="text-gray-500">{exp.company}</p>
            <p className="text-xs text-gray-400">
              {exp.start_date} - {exp.is_current ? "Present" : exp.end_date}
            </p>
          </div>
        ))}
      </div>

      {/* EDUCATION */}
      <div className="mt-4">
        <h2 className="text-sm font-semibold uppercase text-gray-600">
          Education
        </h2>

        {education?.map((edu, i) => (
          <div key={i} className="text-sm mt-2">
            <p className="font-medium">{edu.degree}</p>
            <p className="text-gray-500">{edu.institution}</p>
          </div>
        ))}
      </div>

    </div>
  );
};

export default MinimalImageTemplate;