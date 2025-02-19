import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export const jobInfoStates = {
  jobRole: "",
  experienced: "yes",
  yearsOfExperience: "",
  Technology: "",
  skills: "",
  companyName: "",
  salaryLevel: "",
  degree: "",
  education: "",
  name: "",
  lastProjectName: "",
  interviewType: "Tech",
  jobDescription: "",
};

const initialState = jobInfoStates;

type actionPayloads = {
  key: keyof typeof initialState;
  string: string;
};

export const job_info_slice = createSlice({
  name: "job_info",
  initialState,
  reducers: {
    updateField: (state, action: PayloadAction<actionPayloads>) => {
      const { key, string } = action.payload || {};
      if (key !== undefined && string !== undefined) {
        state[key] = string;
      }
    },
    resetField: () => jobInfoStates,
  },
});

// Action creators are generated for each case reducer function
export const { updateField, resetField } = job_info_slice.actions;

export default job_info_slice.reducer;
