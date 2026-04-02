import Resume from "../models/resume.model.js";
import ai from "../configs/ai.js";

export const enhanceProfessionalSummary = async (req, res) => {
  try {
    const { userContent } = req.body;
    
    if (!userContent) {
      return res.status(400).json({ message: "missing required field" });
    }
    const response = await ai.chat.completions.create({
      model: process.env.OPENAI_MODEL,        // ✅ fixed
      messages: [
        {
          role: "system",
          content: "You are an expert in resume writing. Your task is to enhance the professional summary of a resume. The summary should be 1-2 sentences also highlighting key skills, experience, and career objectives. Make it compelling and ATS-friendly. and only return text no options or anything else.",
        },
        {
          role: "user",                        // ✅ fixed
          content: userContent,
        },
      ],
    });
    const enhancedContent = response.choices[0].message.content;
    return res.status(200).json({ enhancedContent });
  } catch (error) {
    console.log("❌ error message:", error.message)
    console.log("❌ error status:", error.status)
    console.log("❌ error full:", JSON.stringify(error, null, 2))
    return res.status(400).json({ message: error.message });
  }
};

export const enhanceJobDescriptionSummary = async (req, res) => {
  try {
    const { userContent } = req.body;
    if (!userContent) {
      return res.status(400).json({ message: "missing required field" });
    }
    const response = await ai.chat.completions.create({
      model: process.env.OPENAI_MODEL,        // ✅ fixed
      messages: [
        {
          role: "system",
          content: "You are an expert HR professional and job description writer. Create clear, concise, and ATS-friendly job descriptions.",
        },
        {
          role: "user",                        // ✅ fixed
          content: userContent,
        },
      ],
    });
    const enhancedContent = response.choices[0].message.content;
    return res.status(200).json({ enhancedContent });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

export const uploadResume = async (req, res) => {
  try {
    const { resumeText, title } = req.body;
    const userId = req.userId;

    if (!resumeText) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const systemPrompt = "you are an expert AI agent to extract data from resume";
    const userPrompt = `extract data from this resume: ${resumeText}
          
    Provide data in the following JSON format with no additional text before or after:
    {
      "professional_summary": "",
      "skills": "",
      "personal_info": {
        "image": "",
        "full_name": "",
        "profession": "",
        "email": "",
        "phone": "",
        "location": "",
        "linkedin": "",
        "website": ""
      },
      "experience": [
        {
          "company": "",
          "position": "",
          "start_date": "",
          "end_date": "",
          "description": "",
          "is_current": false
        }
      ],
      "projects": [
        {
          "name": "",
          "type": "",
          "description": ""
        }
      ],
      "education": [
        {
          "institution": "",
          "degree": "",
          "field": "",
          "graduation_date": "",
          "description": "",
          "gpa": ""
        }
      ]
    }`;
    // ✅ JSON prompt fixed — was missing closing brackets

    const response = await ai.chat.completions.create({
      model: process.env.OPENAI_MODEL,        // ✅ fixed
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userPrompt }, // ✅ fixed
      ],
      response_format: { type: "json_object" },
    });

    const extractedData = response.choices[0].message.content;
    const parsedData = JSON.parse(extractedData);
    const newResume = await Resume.create({ userId, title, ...parsedData });
    res.json({ resumeId: newResume._id });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};


// controller for ats score checking.
export const getATSScore = async (req, res) => {
  try {
    const { resumeData, jobDescription } = req.body;
 
    if (!jobDescription) {
      return res.status(400).json({ message: "Job description is required" });
    }
 
    if (!resumeData) {
      return res.status(400).json({ message: "Resume data is required" });
    }
 
    const response = await ai.chat.completions.create({
      model: process.env.OPENAI_MODEL,
      messages: [
        {
          role: "system",
          content: "You are an ATS (Applicant Tracking System) expert. Analyze resumes against job descriptions and return ONLY a raw JSON object with no markdown, no backticks, and no extra explanation.",
        },
        {
          role: "user",
          content: `Analyze this resume against the job description and return ONLY this JSON structure:
{
  "overall_score": 78,
  "breakdown": {
    "keyword_match": 70,
    "skills_match": 80,
    "experience_relevance": 85,
    "formatting": 75
  },
  "matched_keywords": ["React", "Node.js", "REST API"],
  "missing_keywords": ["TypeScript", "AWS", "CI/CD"],
  "suggestions": [
    "Add TypeScript to your skills section",
    "Mention cloud experience in your experience",
    "Quantify achievements with numbers"
  ],
  "verdict": "Good match. A few tweaks can significantly improve your chances."
}
 
Resume: ${JSON.stringify(resumeData)}
Job Description: ${jobDescription}`,
        },
      ],
      response_format: { type: "json_object" },
    });
 
    const raw = response.choices[0].message.content;
    const result = JSON.parse(raw);
 
    return res.status(200).json(result);
  } catch (error) {
    console.log("❌ ATS Score error:", error.message);
    return res.status(400).json({ message: error.message });
  }
};