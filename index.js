import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import router from "./routes/user-routes.js";
import blogRouter from "./routes/transaction-routes.js";
import cors from "cors"
import dotenv from "dotenv"
const app = express();
app.use(cors())
app.use(express.json());
dotenv.config();
app.use("/api/user",router);
app.use("/api/transaction",blogRouter)

mongoose.set("strictQuery", false);
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("Db connected"))
  .catch((err) => console.log(err));

const port=process.env.PORT || 3000
app.listen(port, () => {
  console.log("Backend Connected");
});
