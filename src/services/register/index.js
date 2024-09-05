import axios from "axios"



export const registerNewUser=async()=>{
    try{
        const {data}=await axios.post('api/register',{})

    }catch(err){
        console.log(err)
    }
}