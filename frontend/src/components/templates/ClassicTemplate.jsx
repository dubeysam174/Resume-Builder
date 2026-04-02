import { Mail, Phone, MapPin, Link, Globe } from "lucide-react";

const ClassicTemplate = ({ data = {}, accentColor }) => {

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
    <div className="max-w-4xl mx-auto p-8 bg-white text-gray-800 leading-relaxed">

      {/* HEADER */}
      <header
        className="text-center mb-8 pb-6 border-b-2"
        style={{ borderColor: accentColor }}
      >
        <h1
          className="text-3xl font-bold mb-2"
          style={{ color: accentColor }}
        >
          {data?.personal_info?.full_name || "Your Name"}
        </h1>

        {data?.personal_info?.profession && (
          <p className="text-gray-600 text-sm mb-2">{data.personal_info.profession}</p>
        )}

        <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-600">
          {data?.personal_info?.email && (
            <div className="flex items-center gap-1">
              <Mail className="size-4" />
              <span>{data.personal_info.email}</span>
            </div>
          )}

          {data?.personal_info?.phone && (
            <div className="flex items-center gap-1">
              <Phone className="size-4" />
              <span>{data.personal_info.phone}</span>
            </div>
          )}

          {data?.personal_info?.location && (
            <div className="flex items-center gap-1">
              <MapPin className="size-4" />
              <span>{data.personal_info.location}</span>
            </div>
          )}

          {data?.personal_info?.linkedin && (
            <div className="flex items-center gap-1">
              <Link className="size-4" />
              <span className="break-all">{data.personal_info.linkedin}</span>
            </div>
          )}

          {data?.personal_info?.website && (
            <div className="flex items-center gap-1">
              <Globe className="size-4" />
              <span className="break-all">{data.personal_info.website}</span>
            </div>
          )}
        </div>
      </header>

      {/* SUMMARY */}
      {data?.professional_summary && (
        <section className="mb-6">
          <h2 className="text-xl font-semibold mb-3" style={{ color: accentColor }}>
            PROFESSIONAL SUMMARY
          </h2>
          <p className="whitespace-pre-line break-words text-sm leading-relaxed">
            {data.professional_summary}
          </p>
        </section>
      )}

      {/* EXPERIENCE */}
      {Array.isArray(data?.experience) && data.experience.length > 0 && (
        <section className="mb-6">
          <h2 className="text-xl font-semibold mb-4" style={{ color: accentColor }}>
            PROFESSIONAL EXPERIENCE
          </h2>

          <div className="space-y-4">
            {data.experience.map((exp, index) => (
              <div key={index} className="border-l-4 pl-4" style={{ borderColor: accentColor }}>
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="font-semibold text-gray-900">{exp.position}</h3>
                    <p className="text-gray-700 font-medium">{exp.company}</p>
                  </div>
                  <div className="text-right text-sm text-gray-600">
                    <p>
                      {formatDate(exp.start_date)} -{" "}
                      {exp.is_current ? "Present" : formatDate(exp.end_date)}
                    </p>
                  </div>
                </div>
                {exp.description && (
                  <p className="text-gray-700 whitespace-pre-line">{exp.description}</p>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* PROJECTS */}
      {Array.isArray(data?.project) && data.project.length > 0 && (
        <section className="mb-6">
          <h2 className="text-xl font-semibold mb-4" style={{ color: accentColor }}>
            PROJECTS
          </h2>

          <div className="space-y-4">
            {data.project.map((proj, index) => (
              <div key={index} className="border-l-4 pl-4" style={{ borderColor: accentColor }}>
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold text-gray-900">{proj.name}</h3>
                    <p className="text-sm text-gray-600">
                      {proj.type} {proj.role && `• ${proj.role}`}
                    </p>
                  </div>
                  {proj.duration && (
                    <span className="text-sm text-gray-500">{proj.duration}</span>
                  )}
                </div>

                {proj.description && (
                  <p className="text-gray-700 mt-1">{proj.description}</p>
                )}
                {proj.technologies && (
                  <p className="text-sm text-gray-600 mt-1">
                    <span className="font-medium">Tech:</span> {proj.technologies}
                  </p>
                )}
                <div className="flex gap-4 mt-1 text-sm">
                  {proj.github && (
                    <a href={proj.github} target="_blank" rel="noreferrer" className="text-blue-600 hover:underline break-all">
                      GitHub
                    </a>
                  )}
                  {proj.live && (
                    <a href={proj.live} target="_blank" rel="noreferrer" className="text-green-600 hover:underline break-all">
                      Live Demo
                    </a>
                  )}
                </div>
                {proj.achievements && (
                  <p className="text-sm text-gray-700 mt-1">
                    <span className="font-medium">Achievement:</span> {proj.achievements}
                  </p>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* EDUCATION */}
      {Array.isArray(data?.education) && data.education.length > 0 && (
        <section className="mb-6">
          <h2 className="text-xl font-semibold mb-4" style={{ color: accentColor }}>
            EDUCATION
          </h2>

          <div className="space-y-3">
            {data.education.map((edu, index) => (
              <div key={index} className="flex justify-between items-start">
                <div>
                  <h3 className="font-semibold text-gray-900">
                    {edu.degree} {edu.field && `in ${edu.field}`}
                  </h3>
                  <p className="text-gray-700">{edu.institution}</p>
                  {edu.gpa && (
                    <p className="text-sm text-gray-600">GPA: {edu.gpa}</p>
                  )}
                </div>
                <div className="text-sm text-gray-600">
                  <p>{formatDate(edu.graduation_date)}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* SKILLS */}
      {Array.isArray(data?.skills) && data.skills.length > 0 && (
        <section className="mb-6">
          <h2 className="text-xl font-semibold mb-4" style={{ color: accentColor }}>
            CORE SKILLS
          </h2>

          <div className="flex flex-wrap gap-2">
            {data.skills.map((skill, index) => (
              <span key={index} className="px-3 py-1 text-sm bg-gray-100 rounded-full">
                {skill}
              </span>
            ))}
          </div>
        </section>
      )}

    </div>
  );
};

export default ClassicTemplate;