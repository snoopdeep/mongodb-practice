import User from "../models/user.model.js";

// 1: create one user
export const createUser = async (req, res, next) => {
  try {
    console.log('req.body',req.body);
    const singleUser = await User.insertOne(req.body);
    res.status(201).json(singleUser);
  } catch (err) {
    console.log(err);
  }
};
