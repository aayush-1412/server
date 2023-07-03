import mongoose from "mongoose";


const transactionSchema=mongoose.Schema({
    title: {
        type:String,
        required:true,
    },
    description: {
        type:String,
        
    },
    totalExpense:{
        type:Number,
        required:true,
    },
    splitCount:{
        type:Number,
        required:true,
    },
    splitAmong:{
        type:String,
       
        
    },
    splitCategory:{
        type:String,
       
    },
    user:{
        type:mongoose.Types.ObjectId,
        ref:"User",
        required:true,
    },


})

export default mongoose.model('Transaction',transactionSchema)