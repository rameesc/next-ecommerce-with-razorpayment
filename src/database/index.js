import mongoose from "mongoose";


export const connectToDB=async()=>{
    console.log(process.env.DB_URL)
   
    try{
        const connection=await mongoose.connect(process.env.DB_URL);

        if(connection){
            console.log('db connected')

        }
       


    }catch(err){
        console.log(err)
    }
}