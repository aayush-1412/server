import mongoose from "mongoose";

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  transactions: [
    { type: mongoose.Types.ObjectId, ref: "Transaction", required: true }
  ],
});

export default mongoose.model("User", userSchema);
