import { configureStore } from '@reduxjs/toolkit'
import job_info_slice_reducer from '../slice/job-info'
import loading from '../slice/loading'

export const store = configureStore({
    reducer: {
        job_info: job_info_slice_reducer,
        loading: loading
    },
})

export type RootState = ReturnType<typeof store.getState>;