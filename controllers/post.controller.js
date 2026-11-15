import User from "../models/user.model.js";
import Post from "../models/user.model.js";

//1: insert many post ::

export const createPosts = async (req, res, next) => {
  const res = await Post.insertMany(req.body);
  res.status(201).json(res);
};
