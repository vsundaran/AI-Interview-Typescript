export interface ApiResponse<T> {
  success: boolean;
  message: string;
  token:string;
  data: T;
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
