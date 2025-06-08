import api from "./api";
const isLoggedIn = async() => {  
    const data= await checkAuth();
    // console.log("DATA2:",data);
    return data; // returns true if token exists, false otherwise
  };
export default isLoggedIn;

const checkAuth=async ()=>{
    try{
        const res=await api.get('/users/auth/check');
        const data=res?.data;
        // console.log("DATA1:",data);
        return data;
    }catch(error){
        // console.log(error);
    }

}