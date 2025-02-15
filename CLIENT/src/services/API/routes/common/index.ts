import { postData } from "../../apiService";
import { Register, Signin } from "../../types";

export const signin = async (data: Signin) => {
  try {
    const postResponse = await postData(`api/auth/login`, data);
    return postResponse;
  } catch (err) {
    throw err as Error
  }
};

export const register = async (data: Register) => {
  return postData(`api/auth/register`, data);
};
