import express from "express"
import { deleteTransaction, getAllTransactions, getById, getByUserId, updateTransaction } from "../controllers/transaction-controller.js"
import { addTransaction } from "../controllers/transaction-controller.js"

const blogRouter =express.Router()
blogRouter.get("/",getAllTransactions)
blogRouter.post("/add",addTransaction)
blogRouter.put("/update/:id",updateTransaction)
blogRouter.get("/:id",getById)
blogRouter.delete("/:id",deleteTransaction)
blogRouter.get('/user/:id',getByUserId)
export default blogRouter