import editImg from "../assets/images/edit.svg";
import deleteImg from "../assets/images/delete.svg"
import { useDispatch } from "react-redux";
import { editActive, removeTransactions } from "../features/transaction/transactionsSlice";

const SingleTransaction = ({transaction}) => {
  const dispatch = useDispatch()
  const {name, amount, type ,id } = transaction || {};

  const handleDelete =()=>{
    dispatch(removeTransactions(id));
 };
 
  const handleEdit = () =>{
    dispatch(editActive(transaction))
  }

  return (
    <li className={`transaction ${type}`}>
     <p>{name}</p>
     <div className="right">
        <p>৳ {amount}</p>
        <button onClick={handleEdit} className="link">
            <img alt="Edit" className="icon" src={editImg} />
        </button>
        <button onClick={handleDelete} className="link">
            <img alt="Delete"
                className="icon"
                src={deleteImg} />
        </button>
     </div>
   </li>
  )
}

export default SingleTransaction