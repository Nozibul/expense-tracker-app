import axios from "../../utils/axios"

export const getTransaction = async ({type, search}) =>{
   
 //http://localhost:9000/transactions?_&type=expense

    let queryString = "" ;
     if(type){
        queryString += `?_&type=${type}` ;
     };

    if (search){
        queryString += `?_&name_like=${search}`;
     }
   
    const response = await axios.get(`/transactions/${queryString}`);
    return response.data;
};


export const addTransaction = async (data) =>{
    const response = await axios.post("/transactions", data);
    return response.data ;
};


export const editTransaction = async (id, data) =>{
    const response = await axios.put(`/transactions/${id}`, data);
    return response.data ;
};


export const deleteTransaction = async (id) => {
  const response = await axios.delete(`/transactions/${id}`);
  return response.data;
};