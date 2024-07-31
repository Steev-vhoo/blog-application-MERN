import { model, Schema, Types } from "mongoose";
//Create new schema
const postSchema = new Schema({
title: {type:String, required: true},
slug: {type:String, unique: true},
desc: {type:String},
image: {type:String},
category: {type:String},
views: {type:Types.ObjectId, ref: 'View'},
user: {type: Types.ObjectId, ref: 'User', required: true},
comment: {type: Types.ObjectId, ref: 'Comment'},
status: {type:Boolean, default: true}
},{
    //Set time stamps
    timestamps: true
}
)

export const PostModel =model('Post', postSchema);