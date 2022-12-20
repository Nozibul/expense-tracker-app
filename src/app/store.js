import { configureStore } from "@reduxjs/toolkit";
import transactionsReducer from "../features/transaction/transactionsSlice";


export const store = configureStore({
    reducer:{
        transaction: transactionsReducer,
    },
}) ;