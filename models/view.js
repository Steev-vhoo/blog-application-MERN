import { model, Schema, Types } from "mongoose";

const viewschema = new Schema({
    user: {type: Types.ObjectId, ref: 'User'},
    post: {type: Types.ObjectId, ref: 'Post'}
},{
    timestamps:true
})

export const ViewModel = model('View', viewschema)