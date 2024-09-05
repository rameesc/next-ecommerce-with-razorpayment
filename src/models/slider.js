import mongoose from "mongoose";



const sliderSchema=new mongoose.Schema({

    img:{
        type:String,
        required:true
    },
    content:{
        type:String,
        required:true
    },
    btnUrl:{
        type:String,
        required:true
    }


})




export const Slider=mongoose.models.Slider ||mongoose.model('Slider',sliderSchema);