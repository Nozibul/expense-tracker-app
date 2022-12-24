import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import SingleTransaction from "../components/SingleTransaction";
import { typeChange } from "../features/filter/filterSlice";
import { fetchTransactions } from "../features/transaction/transactionsSlice";

const TransactionListing = () => {
  const [types, setTypes] = useState("");

   const dispatch = useDispatch();
   const { transaction: {transactions, isLoading, isError},
          filters: { type }
         } = useSelector((state)=> state)
   
   
    // type change handler
   const typeChangeHandler =(types)=>{
     setTypes(types);
     dispatch(typeChange(types));
   };
  
  // cancel type handler
  // const handleClearType = () => {
  //   dispatch(clearType());
  //   setTypes('');
  // };


  useEffect(()=>{
    dispatch(fetchTransactions(type))
  }, [dispatch ,type])


    // decide what to render
  let content = null;
  if (isLoading) content = <p>Loading...</p>;

  if (!isLoading && isError)
    content = <p className="error">There was an error occured</p>;

  if (!isLoading && !isError && transactions?.length > 0) {
    content = transactions?.map((transaction) => (
      <SingleTransaction key={transaction.id} transaction={transaction}/>
    ));
  }

  if (!isLoading && !isError && transactions?.length === 0) {
    content = <p>No transactions found!</p>;
  }
  return (
    <div>
     <div className="listing-header">
        <div className="types">
          <div className="input-group">
            <input
              type="radio"
              name="type"
              id="income"
              checked={types === 'income'}
              onChange={(e) => typeChangeHandler('income')}
            />
            <label>Income</label>
          </div>
          <div className="input-group">
            <input
              type="radio"
              name="type"
              id="expense"
              checked={types === 'expense'}
              onChange={(e) => typeChangeHandler('expense')}
            />
            <label>Expense</label>
          </div>
        </div>
        {/* <form className="search" onSubmit={searchHandler}>
          <input
            type="text"
            placeholder="search text"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
        </form> */}
      </div>
      <div className="container">
        <ul className="listing-list">{content}</ul>
      </div>
    </div>
  )
}

export default TransactionListing ;