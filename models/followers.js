import { model, Schema, Types } from "mongoose";

const followerSchema = new Schema({
    followerId: { type: Types.ObjectId, ref: "User" },
    writerId: { type:Types.ObjectId, ref: "User" },
},{
    timestamps:true
})

export const FollowerModel = model('follower', followerSchema)