import mongoose from "mongoose";

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    role: String,
    profile: {
      age: Number,
      city: String,
      skills: [String],
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model('User',userSchema);
export default User; 
