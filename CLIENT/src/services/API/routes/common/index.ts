import { postData } from "../../apiService";
import { Register, Signin, UserData,  } from "../../types";

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
    const postResponse = await postData<UserData>(`api/auth/register`, data)
    return postResponse;
  } catch (err) {
    throw err as Error
  }
};
