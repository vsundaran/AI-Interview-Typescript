import { postData } from "../../apiService";
import { Register, RegisterResponse, Signin, UserData,  } from "../../types";

export const signin = async (data: Signin) => {
  try {
    const postResponse = await postData<UserData>(`api/auth/login`, data);
    return postResponse;
  } catch (err) {
    throw err as Error
  }
};

export const register = async (data: Register) => {
  try {
    const postResponse = await postData<RegisterResponse>(`api/auth/register`, data)
    return postResponse;
  } catch (err) {
    throw err as Error
  }
};
