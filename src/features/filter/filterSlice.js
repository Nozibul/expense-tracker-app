import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    type: '',
    search: "",

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
        setSearch: (state, action) => {
            state.search = action.payload;
        },
        clearSearch: (state) => {
            state.search = '';
        },
        clearFilter: (state) => {
            state.search = '';
            state.type = null;
        },
    }
});

export const { 
    typeChange , 
    clearType ,
    setSearch,
    clearSearch,
    clearFilter,

} = filterSlice.actions ;
export default filterSlice.reducer ;
