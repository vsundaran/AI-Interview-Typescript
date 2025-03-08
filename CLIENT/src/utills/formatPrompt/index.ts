import { JobRoleData } from "../../services/API/types";

export const formatAIPrompt = ( userObj: JobRoleData) => {
    // The below data are already available 
  const techList = userObj.technology ?? [];
  const skillsList = userObj.skills ?? [];
  const targetCompanies = userObj.targetCompanyName ?? [];

  return `Based on the following candidate profile and job details, generate one **insightful and role-specific technical question** that assesses the candidate's skills, experience, and suitability for the role
  Candidate Profile:
    - Name: ${userObj.name || "Not provided"}
    - Job Role: ${userObj.jobRole}
    - Experienced: ${userObj.experienced}
    - Years of Experience: ${userObj.yearsOfExperience}
    - Technologies: ${techList.join(", ")}
    - Skills: ${skillsList.join(", ")}
    - Target Company: ${targetCompanies.join(", ")}
    - Salary Expectation: ${userObj.salaryLevel}
    - Degree: ${userObj.degree}
    - Education: ${userObj.education}
    - Last Project Name: ${userObj.lastProjectName || "Not provided"}
    - Interview Type: ${userObj.interviewType}
    - Job Description/Resume: ${
      userObj.jobDescriptionOrResume || "Not provided"
    }
    Provide only the question in the response, without any explanation or intent behind it. Do not include words like 'Question:', 'Intent:', or any additional context—just the question itself.`;
};
