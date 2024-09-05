import { configureStore } from "@reduxjs/toolkit";
import userInfoSlice from "./userInfoSlice";
import allproductSlice from "./allproductSlice";
import getAllCart from "./getAllCart";





export const store=configureStore({
    
    reducer:{
        userinfo:userInfoSlice,
        allProduct:allproductSlice,
        cart:getAllCart

    }
})