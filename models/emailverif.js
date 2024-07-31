import { model, Schema } from "mongoose";

const emailVerificationSchema = new Schema({
    userId: { type: String },
    token: { type: String },
    createdAt: { type: Date },
    expiresAt: { type: Date },
});

export const VerificationModel = model('Verification', emailVerificationSchema)