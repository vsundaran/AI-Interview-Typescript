import { configureStore } from '@reduxjs/toolkit'
import job_info_slice_reducer from '../slice/job-info'
import loading from '../slice/loading'
import  candidate_interviews_reducer  from '../slice/candidate-interviews';

export const store = configureStore({
    reducer: {
        //candidate slices
        job_info: job_info_slice_reducer,
        candidateInterviews:candidate_interviews_reducer,
        //common slices
        loading: loading
        //organisation slices
    },
})

export type RootState = ReturnType<typeof store.getState>;