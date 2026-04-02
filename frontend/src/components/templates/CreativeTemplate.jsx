// templates/CreativeTemplate.jsx
const SkillBar = ({ skill, percent }) => (
  <div style={{ marginBottom: '6px' }}>
    <div style={{ fontSize: '11px', color: '#cbd5e1', marginBottom: '2px' }}>{skill}</div>
    <div style={{ background: '#334155', borderRadius: '4px', height: '5px' }}>
      <div style={{ width: `${percent}%`, background: '#f59e0b', height: '5px', borderRadius: '4px' }} />
    </div>
  </div>
);

const CreativeTemplate = ({ data }) => (
  <div style={{ display: 'grid', gridTemplateColumns: '220px 1fr', fontFamily: 'Inter, sans-serif', background: 'white' }}>
    
    {/* Dark Left Sidebar */}
    <div style={{ background: '#0f172a', color: 'white', padding: '28px 20px' }}>
      <h1 style={{ fontSize: '18px', fontWeight: 500 }}>{data.name}</h1>
      <div style={{ fontSize: '12px', color: '#f59e0b', marginTop: '4px', fontWeight: 500 }}>{data.jobTitle}</div>

      <h3 style={{ fontSize: '10px', textTransform: 'uppercase', letterSpacing: '1.5px', color: '#f59e0b', margin: '18px 0 8px' }}>Contact</h3>
      <p style={{ fontSize: '11px', color: '#cbd5e1' }}>{data.email}</p>
      <p style={{ fontSize: '11px', color: '#cbd5e1' }}>{data.phone}</p>
      <p style={{ fontSize: '11px', color: '#cbd5e1' }}>{data.location}</p>

      <h3 style={{ fontSize: '10px', textTransform: 'uppercase', letterSpacing: '1.5px', color: '#f59e0b', margin: '18px 0 8px' }}>Skills</h3>
      {data.skills?.map((s, i) => <SkillBar key={i} skill={s} percent={90 - i * 8} />)}

      <h3 style={{ fontSize: '10px', textTransform: 'uppercase', letterSpacing: '1.5px', color: '#f59e0b', margin: '18px 0 8px' }}>Education</h3>
      {data.education?.map((edu, i) => (
        <div key={i} style={{ marginBottom: '8px' }}>
          <div style={{ fontSize: '12px', fontWeight: 500, color: 'white' }}>{edu.degree}</div>
          <div style={{ fontSize: '11px', color: '#94a3b8' }}>{edu.school} · {edu.year}</div>
        </div>
      ))}
    </div>

    {/* Right Content */}
    <div style={{ padding: '24px', background: 'white' }}>
      {data.summary && <>
        <h2 style={{ fontSize: '12px', textTransform: 'uppercase', letterSpacing: '1.5px', color: '#0f172a', borderLeft: '3px solid #f59e0b', paddingLeft: '8px', marginBottom: '8px', fontWeight: 500 }}>Summary</h2>
        <p style={{ fontSize: '12px' }}>{data.summary}</p>
      </>}

      <h2 style={{ fontSize: '12px', textTransform: 'uppercase', letterSpacing: '1.5px', color: '#0f172a', borderLeft: '3px solid #f59e0b', paddingLeft: '8px', margin: '16px 0 8px', fontWeight: 500 }}>Experience</h2>
      {data.experience?.map((exp, i) => (
        <div key={i} style={{ marginBottom: '12px' }}>
          <div style={{ fontWeight: 500 }}>{exp.role} — {exp.company}</div>
          <div style={{ fontSize: '11px', color: '#555' }}>{exp.startDate} – {exp.current ? 'Present' : exp.endDate}</div>
          <ul style={{ paddingLeft: '14px', marginTop: '4px' }}>
            {exp.bullets?.map((b, j) => <li key={j} style={{ fontSize: '12px' }}>{b}</li>)}
          </ul>
        </div>
      ))}

      <h2 style={{ fontSize: '12px', textTransform: 'uppercase', letterSpacing: '1.5px', color: '#0f172a', borderLeft: '3px solid #f59e0b', paddingLeft: '8px', margin: '16px 0 8px', fontWeight: 500 }}>Projects</h2>
      {data.projects?.map((proj, i) => (
        <div key={i} style={{ marginBottom: '8px' }}>
          <div style={{ fontWeight: 500 }}>{proj.name}</div>
          <div style={{ fontSize: '12px', color: '#555' }}>{proj.description}</div>
        </div>
      ))}
    </div>
  </div>
);

export default CreativeTemplate;