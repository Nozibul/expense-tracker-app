import { configureStore } from "@reduxjs/toolkit";
import filterSlice from "../features/filter/filterSlice";
import transactionsReducer from "../features/transaction/transactionsSlice";


export const store = configureStore({
    reducer:{
        transaction: transactionsReducer, 
        filters: filterSlice
    },
}) ;