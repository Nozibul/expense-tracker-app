import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    type: ''
};


// create slice
const filterSlice =createSlice({
    name: 'filter',
    initialState,
    reducers: {
        typeChange: (state, action) =>{
            state.type = action.payload;
        },
        clearType: (state) => {
            state.type = null;
        },
    }
});

export const { typeChange , clearType } = filterSlice.actions ;
export default filterSlice.reducer ;
