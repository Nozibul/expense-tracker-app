import editImg from "../assets/images/edit.svg";
import deleteImg from "../assets/images/delete.svg"

const SingleTransaction = () => {
  return (
    <li className="transaction income">
     <p>Earned this month</p>
     <div className="right">
        <p>৳ 100</p>
        <button className="link">
            <img alt="Edit" className="icon" src={editImg} />
        </button>
        <button className="link">
            <img alt="Delete"
                className="icon"
                src={deleteImg} />
        </button>
     </div>
   </li>
  )
}

export default SingleTransaction