
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { fetchTransactions } from "../features/transaction/transactionsSlice";
import SingleTransaction from "./SingleTransaction";

const Transactions = () => {
   const dispatch = useDispatch()
   const {transactions, isLoading, isError} = useSelector((state)=>state.transaction)
 
   useEffect(()=>{
     dispatch(fetchTransactions())
   }, [dispatch]);

 

   // decide what to render
   let content = null ;
   if(isLoading) content = <p>Loading...</p> ;

   if(!isLoading && isError){
    content = <p className="error"> There was an error occurred </p>
   }

   if(!isLoading && !isError && transactions?.length > 0){
    content = transactions?.slice(0, 5).map((transaction)=>(
      <SingleTransaction key={transaction.id} transaction={transaction} />
    )).reverse() ;
   }

   if(!isLoading && !isError && transactions?.length === 0){
     content = <p>No Transactions Found!</p>
   };
   

  return (
    <>
     <p className="second_heading">Your Transactions:</p>

        <div className="conatiner_of_list_of_transactions">
            <ul>
               {content}
            </ul>
            {(transactions.length > 5) && (
          <Link
            to="/transactions"
            className="btn"
            style={{
              textAlign: 'center',
              background: 'mediumseagreen',
              display: 'block',
              textDecoration: 'none',
            }}
          >
            View All
          </Link>
        )}
        </div>
    </>
  )
}

export default Transactions ;