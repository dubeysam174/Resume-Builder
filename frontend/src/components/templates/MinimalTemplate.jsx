const MinimalTemplate = ({ data = {}, accentColor }) => { 
    // ✅ FIX: added default value `data = {}`

  const formatDate = (dateStr) => {
  if (!dateStr) return "";
  // Already human readable like "MAY 2024", "OCT 2022"
  if (isNaN(Date.parse(dateStr)) === false || /^[A-Za-z]/.test(dateStr)) {
    return dateStr; // ✅ just return as-is
  }
  const parts = dateStr.split("-");
  const year = parseInt(parts[0]);
  const month = parseInt(parts[1]);
  if (!year || isNaN(year)) return "";
  if (!month || isNaN(month)) return String(year);
  return new Date(year, month - 1).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
  });
};

    return (
        <div className="max-w-4xl mx-auto p-8 bg-white text-gray-900 font-light">
            
            {/* Header */}
            <header className="mb-10">
                <h1 className="text-4xl font-thin mb-4 tracking-wide">
                    {data?.personal_info?.full_name || "Your Name"} 
                    {/* ✅ FIX: safe access */}
                </h1>

                <div className="flex flex-wrap gap-6 text-sm text-gray-600">
                    {data?.personal_info?.email && <span>{data.personal_info.email}</span>} 
                    {/* ✅ FIX */}
                    
                    {data?.personal_info?.phone && <span>{data.personal_info.phone}</span>} 
                    {/* ✅ FIX */}
                    
                    {data?.personal_info?.location && <span>{data.personal_info.location}</span>} 
                    {/* ✅ FIX */}
                    
                    {data?.personal_info?.linkedin && (
                        <span className="break-all">{data.personal_info.linkedin}</span>
                    )} 
                    {/* ✅ FIX */}
                    
                    {data?.personal_info?.website && (
                        <span className="break-all">{data.personal_info.website}</span>
                    )} 
                    {/* ✅ FIX */}
                </div>
            </header>

            {/* Professional Summary */}
            {data?.professional_summary && ( 
                // ✅ FIX: safe access
                <section className="mb-10">
                    <h2>PROFESSIONAL SUMMARY</h2>

                    <p className="whitespace-pre-line break-words text-sm leading-relaxed">
                        {data.professional_summary}
                    </p>
                </section>
            )}

            {/* Experience */}
            {Array.isArray(data?.experience) && data.experience.length > 0 && ( 
                // ✅ FIX: array check
                <section className="mb-10">
                    <h2 className="text-sm uppercase tracking-widest mb-6 font-medium" style={{ color: accentColor }}>
                        Experience
                    </h2>

                    <div className="space-y-6">
                        {data.experience.map((exp, index) => (
                            <div key={index}>
                                <div className="flex justify-between items-baseline mb-1">
                                    <h3 className="text-lg font-medium">{exp.position}</h3>
                                    <span className="text-sm text-gray-500">
                                        {formatDate(exp.start_date)} - {exp.is_current ? "Present" : formatDate(exp.end_date)}
                                    </span>
                                </div>
                                <p className="text-gray-600 mb-2">{exp.company}</p>
                                {exp.description && (
                                    <div className="text-gray-700 leading-relaxed whitespace-pre-line">
                                        {exp.description}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </section>
            )}

            {/* Projects */}
            {Array.isArray(data?.project) && data.project.length > 0 && ( 
                // ✅ FIX: array check
                <section className="mb-10">
                    <h2 className="text-sm uppercase tracking-widest mb-6 font-medium" style={{ color: accentColor }}>
                        Projects
                    </h2>

                    <div className="space-y-4">
                        {data.project.map((proj, index) => (
                            <div key={index} className="flex flex-col gap-2 justify-between items-baseline">
                                <h3 className="text-lg font-medium ">{proj.name}</h3>
                                <p className="text-gray-600">{proj.description}</p>
                            </div>
                        ))}
                    </div>
                </section>
            )}

            {/* Education */}
            {Array.isArray(data?.education) && data.education.length > 0 && ( 
                // ✅ FIX: array check
                <section className="mb-10">
                    <h2 className="text-sm uppercase tracking-widest mb-6 font-medium" style={{ color: accentColor }}>
                        Education
                    </h2>

                    <div className="space-y-4">
                        {data.education.map((edu, index) => (
                            <div key={index} className="flex justify-between items-baseline">
                                <div>
                                    <h3 className="font-medium">
                                        {edu.degree} {edu.field && `in ${edu.field}`}
                                    </h3>
                                    <p className="text-gray-600">{edu.institution}</p>
                                    {edu.gpa && <p className="text-sm text-gray-500">GPA: {edu.gpa}</p>}
                                </div>
                                <span className="text-sm text-gray-500">
                                    {formatDate(edu.graduation_date)}
                                </span>
                            </div>
                        ))}
                    </div>
                </section>
            )}

            {/* Skills */}
            {Array.isArray(data?.skills) && data.skills.length > 0 && ( 
                // ✅ FIX: MAIN BUG FIX (skills must be array)
                <section>
                    <h2 className="text-sm uppercase tracking-widest mb-6 font-medium" style={{ color: accentColor }}>
                        Skills
                    </h2>

                    <div className="text-gray-700">
                        {(data.skills || []).join(" • ")} 
                        {/* ✅ FIX: fallback to [] to prevent crash */}
                    </div>
                </section>
            )}
        </div>
    );
}

export default MinimalTemplate;