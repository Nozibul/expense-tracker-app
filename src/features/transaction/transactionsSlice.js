import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getTransaction, addTransaction, editTransaction, deleteTransaction } from "./transactionAPI";


const initialState = {
    transactions: [],
    isLoading: false,
    isError: false,
    error: "",
    editing: {},
    modalEdit: false,
};

// create async thunk 
export const fetchTransactions = createAsyncThunk(
    "transaction/fetchTransactions", async({type, search})=>{
        const transactions = await getTransaction({type, search})
        return transactions ;
    }
);

export const createTransactions = createAsyncThunk(
    "transaction/createTransactions", async(data)=>{
        const transaction = await addTransaction(data)
        return transaction ;
    }
);

export const changeTransactions = createAsyncThunk(
    "transaction/changeTransactions", async({id, data})=>{
        const transaction = await editTransaction(id, data)
        return transaction ;
    }
);

export const removeTransactions = createAsyncThunk(
    "transaction/removeTransactions", async(id)=>{
        const transaction = await deleteTransaction(id)
        return transaction ;
    }
);


// create slice 
const transactionSlice = createSlice({
    name: 'transaction',
    initialState,
    reducers: {
        editActive:(state, action)=>{
            state.editing = action.payload;
        },
        editInActive:(state)=>{
            state.editing = {};
        },
        setModalEdit: (state) => {
            state.modalEdit = true;
        },
        cancelModalEdit: (state) => {
            state.modalEdit = false;
        },
    },
    extraReducers: (builder) =>{
        builder
        .addCase(fetchTransactions.pending, (state)=>{
            state.isError = false;
            state.isLoading = true
        })
        .addCase(fetchTransactions.fulfilled, (state, action)=>{
            state.isError = false;
            state.isLoading = false;
            state.transactions = action.payload
        })
        .addCase(fetchTransactions.rejected, (state, action)=>{
            state.isError = true;
            state.error = action.error?.message ;
            state.isLoading = false;
            state.transactions = []
        })
        .addCase(createTransactions.pending, (state)=>{
            state.isError = false;
            state.isLoading = true
        })
        .addCase(createTransactions.fulfilled, (state, action)=>{
            state.isError = false;
            state.isLoading = false;
            state.transactions.push(action.payload)
        })
        .addCase(createTransactions.rejected, (state, action)=>{
            state.isError = true;
            state.error = action.error?.message ;
            state.isLoading = false;
        })
        .addCase(changeTransactions.pending, (state)=>{
            state.isError = false;
            state.isLoading = true
        })
        .addCase(changeTransactions.fulfilled, (state, action)=>{
            state.isError = false;
            state.isLoading = false;
            
           const updateIndex = state.transactions.findIndex((tIndex)=> tIndex.id === action.payload.id)
           state.transactions[updateIndex] = action.payload;
        })
        .addCase(changeTransactions.rejected, (state, action)=>{
            state.isError = true;
            state.error = action.error?.message ;
            state.isLoading = false;
        })
        .addCase(removeTransactions.pending, (state)=>{
            state.isError = false;
            state.isLoading = true
        })
        .addCase(removeTransactions.fulfilled, (state, action)=>{
            state.isError = false;
            state.isLoading = false;
            state.transactions = state.transactions.filter(( t )=> t.id !== action.meta.arg)
        })
        .addCase(removeTransactions.rejected, (state, action)=>{
            state.isError = true;
            state.error = action.error?.message ;
            state.isLoading = false;
        })
    }
});

export default transactionSlice.reducer ;
export const {editActive, editInActive, setModalEdit, cancelModalEdit} = transactionSlice.actions ;