import axios from "axios";

export const returnErrorMessage = (err:unknown) => {
  let errorMessage = "Interaction Failed";

  if (axios.isAxiosError(err) && err.response?.data?.message) {
    errorMessage = err.response.data.message;
  } else if (err instanceof Error) {
    errorMessage = err.message;
  };
  return errorMessage
};
