import mongoose from 'mongoose';



const addressSchema=new mongoose.Schema({

    fullname:{
        type:String,
        required:true
    },
    city:{
        type:String,
        required:true
    },
    pinCode:{
        type:Number,
        required:true
    },
    phone:{
        type:Number,
        required:true
    },
    address:{
        type:String,
        required:true
    },
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    }
},{
    timeseries:true
})

export const Address=mongoose.models.Address||mongoose.model('Address',addressSchema)