import { model, Schema, Types } from "mongoose";
import joi from "joi";

const commentSchema = new Schema({
    user: {type: Types.ObjectId, ref: 'User'},
    post: {type: Types.ObjectId, ref: 'Post'},
    desc: { type: String }
},{
    timestamps:true
})


export const commentValidator = joi.object({

})
user: joi.string()
export const CommentModel = model('Comment', commentSchema)