import joi from "joi";
import { model, Schema, Types } from "mongoose";

const userSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique:true},
    emailVerified: { type: Boolean, default: false},
    accountType: { type: String, enum: ['user', 'writer'], default:"user"},
    image: { type: String},
    password: { type: String, required: true },
    followers: [{ type: Types.ObjectId, ref: 'follower'}],
},{
    timestamps:true
})

export const registerValidator = joi.object({
    name: joi.string().required(),
    email: joi.string().email().required(),
    password: joi.string().required(),
    confirmPassword: joi.string().valid(joi.ref('password')).required(),
})

export const loginValidator = joi.object({
    username: joi.string().alphanum(),
    email: joi.string().email(),
    password: joi.string().required(),
});

export const UserModel =model('User', userSchema)