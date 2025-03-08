export interface AxiosApiResponse<T> {
  data: T;
}

export interface AuthResponse {
  success: boolean;
  token: string;
  user: UserData;
}

export interface CreateJobResponse {
  success: boolean;
  jobRole: CreateJob;
  filteredJobRoles:CreateJobDataGridRow[]
}

export interface GetJobRolesResponse {
  success: boolean;
  jobRoles: JobRoleData[];
}

export interface GetJobRoleResponse {
  success: boolean;
  jobRole: JobRoleData;
}

export interface UserResponse {
  success: boolean;
  user: UserData;
}

export type Signin = {
  email: string;
  password: string;
  role: string;
};

export type Register = {
  name: string;
  email: string;
  password: string;
  role: string;
};

export type CreateJob = {
  userId: string;
  jobRole: string;
  experienced: string;
  yearsOfExperience: string;
  technology: string[];
  skills: string[];
  targetCompanyName: string[];
  salaryLevel: string;
  degree: string;
  education: string;
  name: string;
  lastProjectName: string;
  interviewType: string;
  jobDescriptionOrResume: string;
  role: string;
};

export type UserData = {
  _id: string;
  name: string;
  email: string;
  role: string;
};

export type JobRoleData = {
  id: number | string;
  title: string;
  status: string;
  scores?: number | null;

  userId?:string
  jobRole?:string
  yearsOfExperience?:string
  experienced?:string
  technology?:string[]
  skills?:string[]
  targetCompanyName?:string[]
  salaryLevel?:string
  degree?:string
  education?:string
  name?:string
  lastProjectName?:string
  interviewType?:string
  role?:string
  jobDescriptionOrResume?:string
  createdAt?:string
  updatedAt?:string
  __v?:string
};

export type CandidateInterview = {
  id: number | string;
  title: string;
  status: string;
  scores?: number | null;

  userId?:string
  jobRole?:string
  yearsOfExperience?:string
  experienced?:string
  technology?:string[]
  skills?:string[]
  targetCompanyName?:string[]
  salaryLevel?:string
  degree?:string
  education?:string
  name?:string
  lastProjectName?:string
  interviewType?:string
  role?:string
  jobDescriptionOrResume?:string
  createdAt?:string
  updatedAt?:string
  __v?:string
};

export type CreateJobDataGridRow = {
  id: number | string;
  title: string;
  status: string;
  scores?: number | null;

  userId?:string
  jobRole?:string
  yearsOfExperience?:string
  experienced?:string
  technology?:string[]
  skills?:string[]
  targetCompanyName?:string[]
  salaryLevel?:string
  degree?:string
  education?:string
  name?:string
  lastProjectName?:string
  interviewType?:string
  role?:string
  jobDescriptionOrResume?:string
  createdAt?:string
  updatedAt?:string
  __v?:string
};


// "_id": "67b5cd6723caab5721c3dfd2",
        
//             "jobDescriptionOrResume": "",
//             "role": "candidate",
//             "status": "Interview",
//             "createdAt": "2025-02-19T12:24:07.498Z",
//             "updatedAt": "2025-02-19T12:24:07.498Z",
//             "__v": 0

// {
//     "_id": "67b3d2d8d84ae08fa664e8e0",
//     "name": "bumuzive",
//     "email": "bumuzive@polkaroad.net",
//     "role": "organisation",
//     "createdAt": "2025-02-18T00:22:48.754Z",
//     "updatedAt": "2025-02-18T00:22:48.754Z",
//     "__v": 0
// }

// {
//     "success": true,
//     "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2N2IxYzE2OWZjOGM1MGI4N2IwYTZjN2EiLCJpYXQiOjE3Mzk3MDMyMjgsImV4cCI6MTc0MjI5NTIyOH0.x_942q9fOv_2RhmjtlQlHYMvAOFHP04fCsFMyZqOOxI",
//     "user": {
//         "_id": "67b1c169fc8c50b87b0a6c7a",
//         "name": "temapi",
//         "email": "temapi@dreamclarify.org",
//         "role": "organisation"
//     }
// }
