export interface AxiosApiResponse<T> {
  data: T;
  status: number;
  statusText: string;
}

export interface RegisterResponse {
  success:boolean;
  token:string;
  user:UserData
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
//     "success": true,
//     "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2N2IxYzE2OWZjOGM1MGI4N2IwYTZjN2EiLCJpYXQiOjE3Mzk3MDMyMjgsImV4cCI6MTc0MjI5NTIyOH0.x_942q9fOv_2RhmjtlQlHYMvAOFHP04fCsFMyZqOOxI",
//     "user": {
//         "_id": "67b1c169fc8c50b87b0a6c7a",
//         "name": "temapi",
//         "email": "temapi@dreamclarify.org",
//         "role": "organisation"
//     }
// }