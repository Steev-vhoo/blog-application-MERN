import jwt from "jsonwebtoken"
import { VerificationModel } from "../models/emailverif.js";
import { UserModel } from "../models/user.js";

export const isAuthenticated = (req, res, next) => {
    try {
        const authHeader = req?.headers?.authorization;
        if (authHeader) {
            // Extract token from headers
            const token = req?.headers?.authorization?.split(' ')[1];
            // Verify the token to get user and append to request
            req.user = jwt.verify(token, process.env.JWT_PRIVATE_KEY);
            // Call next function
            next();
        }
        else {
            res.status(401).json('User not authenticated');
        }
    } catch (error) {
        res.status(401).json(error);
    }
}

export function generateOTP() {
    const min = 100000; // Minimum 6-digit number
    const max = 999999; // Maximum 6-digit number

    let randomNumber;

    randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;

    return randomNumber;
}

export const OPTVerification = async (req, res, next) => {
    try {
        const { userId, otp } = req.params;

        const result = await VerificationModel.findOne({ userId });

        const { expiresAt, token } = result;

        // token has expired, delete token
        if (expiresAt < Date.now()) {
            await VerificationModel.findOneAndDelete({ userId });

            const message = "Verification token has expired.";
            res.status(404).json({ message });
        } else {
            const isMatch = await compareString(otp, token);

            if (isMatch) {
                await Promise.all([
                    UserModel.findOneAndUpdate({ _id: userId }, { emailVerified: true }),
                    VerificationModel.findOneAndDelete({ userId }),
                ]);

                const message = "Email verified successfully";
                res.status(200).json({ message });
            } else {
                const message = "Verification failed or link is invalid";
                res.status(404).json({ message });
            }
        }
    } catch (error) {
        console.log(error);
        res.status(404).json({ message: "Something went wrong" });
    }
};

export const resendOTP = async (req, res, next) => {
    try {
        const { id } = req.params;

        await VerificationModel.findOneAndDelete({ userId: id });

        const user = await UserModel.findById(id);

        user.password = undefined;

        const token = jwt.sign(
            { id: user.id },
            process.env.JWT_SECRET_KEY,
            { expiresIn: '1h' }
        );
        if (user?.accountType === "Writer") {
            sendVerificationEmail(user, res, token);
        } else res.status(404).json({ message: "Something went wrong" });
    } catch (error) {
        console.log(error);
        res.status(404).json({ message: "Something went wrong" });
    }
};