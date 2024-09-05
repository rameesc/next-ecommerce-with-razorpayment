
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";


export const fetchUserdata=createAsyncThunk('user/fetchUserdata',async()=>{

    try{
        const {data}=await axios.get('/api/userinfo',{
            headers:{
                Authorization:`Bearer ${localStorage.getItem('TOKEN')}`
            }
        })

        return data


    }catch(error){
        return error.message
    }


})


const userInfoSlice=createSlice({
    name:'user',
    initialState:{
        userInfo:'',
        isUser:false,
        loading:false,
        message:''
    },

    reducers:{
        userinfo:(state,action)=>{
            console.log(action)

        }
    },
    extraReducers:(builder)=>{
        builder.addCase(fetchUserdata.pending,(state,action)=>{
            state.loading=true

        })
        builder.addCase(fetchUserdata.rejected,(state,action)=>{
            state.loading=false,
            state.isUser=true,
            state.message=action.error

        })
        builder.addCase(fetchUserdata.fulfilled,(state,action)=>{
          
            state.loading=false,
            state.userInfo=action?.payload


        })
        
    }
})

export default userInfoSlice.reducer

export const {userinfo}=userInfoSlice.actions