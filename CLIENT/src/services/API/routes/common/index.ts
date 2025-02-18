import { getData, postData } from "../../apiService";
import { AuthResponse,  CreateJob,  CreateJobResponse,  Register,  Signin,  UserResponse } from "../../types";

export const signin = async (data: Signin) => {
  try {
    const postResponse = await postData<AuthResponse>(`api/auth/login`, data);
    return postResponse;
  } catch (err) {
    throw err as Error
  }
};

export const register = async (data: Register) => {
  try {
    const postResponse = await postData<AuthResponse>(`api/auth/register`, data)
    return postResponse;
  } catch (err) {
    throw err as Error
  }
};

export const fetchUserData = async () => {
  try {
    const getResponse = await getData<UserResponse>(`api/profile/user-data`,)
    return getResponse;
  } catch (err) {
    throw err as Error
  }
};

export const createJob = async (data: CreateJob) => {
  try {
    const postResponse = await postData<CreateJobResponse>(`api/jobroles/create-job-role`, data)
    return postResponse;
  } catch (err) {
    throw err as Error
  }
};