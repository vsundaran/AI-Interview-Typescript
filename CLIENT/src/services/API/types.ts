export interface AxiosApiResponse<T> {
  data: T;
}

export interface AuthResponse {
  success: boolean;
  token: string;
  user: UserData;
}

export interface UserResponse {
  success: boolean;
  user: UserData;
}



export type Signin = {
  email: string;
  password: string;
  role:string;
};

export type Register = {
  name: string;
  email: string;
  password: string;
  role:string;
};


export type UserData = {
  _id: string;
  name: string;
  email: string;
  role: string;
};

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