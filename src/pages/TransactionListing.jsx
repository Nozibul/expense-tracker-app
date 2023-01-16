import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Form from "../components/Form";
import SingleTransaction from "../components/SingleTransaction";
import { clearType, typeChange, setSearch, clearSearch, clearFilter } from "../features/filter/filterSlice";
import { fetchTransactions } from "../features/transaction/transactionsSlice";

const TransactionListing = () => {
  const [types, setTypes] = useState("");
  const [searchText , setSearchText] = useState('');


   const dispatch = useDispatch();
   const { transaction: {transactions, isLoading, isError ,modalEdit },
          filters: {  type , search }
         } = useSelector((state)=> state)
   

  useEffect(()=>{
    dispatch(fetchTransactions({type, search}))
  }, [ type, search, dispatch ]);


  // type change handler
   const typeChangeHandler =(types)=>{
     setTypes(types);
     dispatch(typeChange(types));
   };
  
  // cancel type handler
  const handleClearType = () => {
    dispatch(clearType());
    setTypes('');
  };


  // search 
  const searchHandler = (e) => {
     e.preventDefault();
     if(searchText){
      dispatch(setSearch(searchText));
      return setSearchText('')
     }
     dispatch(clearSearch());
  };


  const handleClearFilter = () => {
    dispatch(clearFilter());
    setTypes('');
  };


    // decide what to render
  let content = null;
  if (isLoading) content = <p>Loading...</p>;

  if (!isLoading && isError){
    content = <p className="error">There was an error occured</p>;
  };

  if (!isLoading && !isError && transactions?.length > 0) {
    content = transactions?.map((transaction) => (
      <SingleTransaction key={transaction.id} transaction={transaction}/>
    ));
  };

  if (!isLoading && !isError && transactions?.length === 0) {
    content = <p>No transactions found!</p>;
  };


  return (
    <div>
        {modalEdit && (
        <div className="fixed top-0 bottom-0 left-0 right-0 w-full h-full bg-[rgba(0,0,0,0.8)] flex items-center justify-center">
          <Form />
        </div>
      )}
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
         <form className="search" onSubmit={searchHandler}>
          <input
            type="text"
            placeholder="search text"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
        </form> 
      </div>
      {(search || type) && (
        <div className="flex items-center justify-between w-full my-6">
          <div className="flex items-center space-x-4">

            {type && (
              <button className="btn-clr"
                onClick={handleClearType}
              >{type} <span>clear</span></button>
            )}{' '}

            {search && (
              <button className="btn-clr"
                onClick={() => dispatch(clearSearch())}
              >{`"${search}"`} <span>clear</span></button>
            )}

          </div>
          <div>
            <button className="btn-clr"
              onClick={handleClearFilter}
            >
              clear
            </button>
          </div>
        </div>
      )}
   
      <div className="container">
        <ul className="listing-list">{content}</ul>
      </div>
    </div>
  )
}

export default TransactionListing ;