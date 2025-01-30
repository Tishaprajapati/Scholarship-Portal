import { createSlice } from '@reduxjs/toolkit';

// const initialState = {
//     allJobs: [], // Set to empty array by default
//     loading: false, // Loading state if you want to track fetching status
// };


const scholarshipSlice = createSlice({
    name: 'scholarship',
    initialState:{
        allScholarships: [],
    },
    reducers: {
        setAllScholarships: (state, action) => {
            state.allScholarships = action.payload; // Setting the fetched jobs in the state
            console.log( state.allScholarships);
        }
    }
});
// Export actions
export const { setAllScholarships } = scholarshipSlice.actions;

// Export the reducer to be added to the store
export default scholarshipSlice.reducer;
