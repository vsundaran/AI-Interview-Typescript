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
    resetFiled: (state) => {
      state.jobRole = "";
      state.experienced = "yes";
      state.yearsOfExperience = "";
      state.Technology = "";
      state.skills = "";
      state.companyName = "";
      state.salaryLevel = "";
      state.degree = "";
      state.education = "";
      state.name = "";
      state.lastProjectName = "";
      state.interviewType = "Tech";
      state.jobDescription = "";
    },
  },
});

// Action creators are generated for each case reducer function
export const { updateField, resetFiled } = job_info_slice.actions;

export default job_info_slice.reducer;
