import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import { changeTransactions, createTransactions } from "../features/transaction/transactionsSlice";

const Form = () => {
    const dispatch = useDispatch();
    const { isLoading, isError , editing } = useSelector((state)=> state.transaction)
   
    const [name, setName] = useState('');
    const [type, setType] = useState('');
    const [amount, setAmount] = useState('');

    const [editMode, setEditMode] = useState(false);

    const reset =()=>{
        setName('');
        setType(''); 
        setAmount('');
    };

    // listen for edit mode active
    useEffect(()=>{
        const {id, name, type, amount} = editing || {};
        if(id){
            setName(name);
            setType(type);
            setAmount(amount);
            setEditMode(true);
        }else{
          setEditMode(false)
          reset()
        }
    }, [editing]);

    const handleCreate = (e) =>{
          e.preventDefault()
          dispatch(createTransactions({name, type, amount: Number(amount)}))
          reset()
    };

    const handleUpdate =(e)=>{
        e.preventDefault()
        dispatch(changeTransactions({
            id: editing?.id,
            data: {
                name,
                type,
                amount,
            },
        }))
        reset();
    };

    const cancelEdit = ()=>{
        setEditMode(false)
        reset()
    };
     
  return (
    <div className="form">
        <h3>Add new transaction</h3>
         <form onSubmit={editMode ? handleUpdate : handleCreate}>
            <div className="form-group">
                <label>Name</label>
                <input
                    required
                    type="text"
                    name="name"
                    placeholder="Enter Title"
                    value={name}
                    onChange={e=> setName(e.target.value)}
                />
            </div>

            <div className="form-group radio">
                <label>Type</label>
                <div className="radio_group">
                    <input
                        required
                        type="radio"
                        value="income"
                        name="type"
                        checked={type === 'income'}
                        onChange={()=> setType('income')}
                    />
                    <label>Income</label>
                </div>
                <div className="radio_group">
                    <input
                        type="radio"
                        value="expense"
                        name="type"
                        placeholder="Expense"
                        checked={type === 'expense'}
                        onChange={()=> setType('expense')}
                    />
                    <label>Expense</label>
                </div>
            </div>

            <div className="form-group">
                <label>Amount</label>
                <input
                    required
                    type="number"
                    placeholder="amount"
                    name="amount"
                    value={amount}
                    onChange={e=> setAmount(e.target.value)}
                />
            </div>

            <button disabled={isLoading} className="btn" type="submit">
                {editMode ? "Update Transaction" : "Add Transaction"}
            </button>
            
            { !isLoading && isError && <p className="error">There was an Error</p>}

         </form>

         {editMode && <button onClick={cancelEdit}  className="btn cancel_edit">Cancel Edit</button>}
        </div>
  )
}

export default Form ;