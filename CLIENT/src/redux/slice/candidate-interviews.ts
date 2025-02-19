import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CandidateInterview } from "../../services/API/types";

// export const candidateInterviews = [
//         {
//             id: "67b5cd6723caab5721c3dfd2",
//             title: "Frontend Developer",
//             status: "Interview",
//             scores: null,
//             name:"Sundaran"
//         }
// ];

type actionPayloads = {
  candidateInterviews: CandidateInterview[];
};

const initialState:CandidateInterview[] = [];

export const candidate_interviews_slice = createSlice({
  name: "candidate_interviews",
  initialState,
  reducers: {
    setCandidateInterviews: (_, action: PayloadAction<actionPayloads>) => {
      const { candidateInterviews } = action.payload;
      // console.log(action.payload, "action.payload")
      // console.log(candidateInterviews, "enters")
      if (candidateInterviews && candidateInterviews.length) {
        // console.log(candidateInterviews, "candidateInterviews")
         return candidateInterviews
      }
    },
  },
});

// Action creators are generated for each case reducer function
export const { setCandidateInterviews } = candidate_interviews_slice.actions;

export default candidate_interviews_slice.reducer;
