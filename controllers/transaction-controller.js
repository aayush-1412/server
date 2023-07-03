
import mongoose, { mongo } from "mongoose";
import Transaction from "../models/Transaction.js";
import User from "../models/User.js";
export const getAllTransactions = async (req, res, next) => {
    let transactions;
    try {
        transactions = await Transaction.find().populate("user")
    } catch (error) {
        console.log(error);
    }
    if (!transactions) {
        return res.status(404).json({ message: "No transactions found" });
    }
    return res.status(200).json({ transactions });
};

export const addTransaction = async (req, res, next) => {
    const { title, description, splitCount, totalExpense, splitAmong, splitCategory, user } =
        req.body;
        let existingUser;
        try {
            existingUser=await User.findById(user)
        } catch (error) {
            return console.log(error)
        }
        if(!existingUser){
            return res.status(400).json({message:"unable to find user by this id"})
        }
    const transaction = new Transaction({
        title,
        description,
        totalExpense,
        splitCount,
        splitAmong,
        splitCategory,
        user,
    });
    try {
      const session = await mongoose.startSession();
      session.startTransaction();
      await transaction.save({session})
      existingUser.transactions.push(transaction)
      await existingUser.save({session})
      await session.commitTransaction()
    } catch (error) {
         console.log(error)
        return res.status(500).json({message:error})
    }
    return res.status(200).json({ transaction });
};

export const updateTransaction = async (req, res, next) => {

    const { title, description, splitCount, totalExpense, splitAmong, splitCategory, user } =
        req.body;
    const transactionId = req.params.id;
    let transaction
    try {
            transaction = await Transaction.findByIdAndUpdate(transactionId, {
            title,
            description,
            splitCount,
            totalExpense,
            splitAmong,
            splitCategory,
            user,
        })
    } catch (error) {
            return console.log(error)
    }
    if(!transaction){
        return res.status(500).json({message:"Unable to update"})
    }
    return res.status(200).json({transaction})
}
export const getById =async (req,res,next)=>{
    const id=req.params.id;
    let transaction;
    try {
        transaction=await Transaction.findById(id)
    } catch (error) {
        return console.log(error)
    }
    if(!transaction){
        return res.status(404).json({message:"No Transaction found"})
    }
    return res.status(200).json({transaction})
}

export const deleteTransaction=async (req,res,next)=>{
    const id=req.params.id;
    let transaction;
    try {
        transaction=await Transaction.findByIdAndDelete(id).populate('user')
        await transaction.user.transactions.pull(transaction)
        await transaction.user.save()
    } catch (error) {
       return console.log(error)
    }
    if(!transaction){
        return res.status(500).json({message:"unable to delete (transaction not found)"})
    }
    return res.status(200).json({message:"Successfully deleted"})
}
export const getByUserId=async (req,res,next)=>{
    const userId=req.params.id
    let userTransactions;
    try {
        userTransactions=await User.findById(userId).populate("transactions")
    } catch (error) {
        return console.log(error)
    }
    if(!userTransactions){
        return res.status(404).json({message:"No Tansaction Found"})
    }
    return res.status(200).json({user:userTransactions})
}