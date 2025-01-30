import { createSlice } from '@reduxjs/toolkit';

// const initialState = {
//     allJobs: [], // Set to empty array by default
//     loading: false, // Loading state if you want to track fetching status
// };


const scholarshipSlice = createSlice({
    name: 'scholarship',
    initialState:{
        allScholarships: [],
        singleScholarship:null,
    },
    reducers: {
        setAllScholarships: (state, action) => {
            state.allScholarships = action.payload; // Setting the fetched jobs in the state
            console.log( state.allScholarships);
        },
        setSingleScholarship : (state,action)=>{
            state.singleScholarship = action.payload;
        }
    }
});
// Export actions
export const { setAllScholarships,setSingleScholarship } = scholarshipSlice.actions;

// Export the reducer to be added to the store
export default scholarshipSlice.reducer;
