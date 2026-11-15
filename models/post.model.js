import mongoose from "mongoose";

const postSchema = mongoose.Schema({
    title:String,
    content:String,
    author:{
        type:mongoose.Types.ObjectId,
        ref:'User'
    },
    tags:[String],
    published:Boolean,
    publishedAt:Date,
    views:Number,
    likes:Number,
    comments:[Number],
});

const Post = mongoose.model('Post',postSchema);
export default Post;