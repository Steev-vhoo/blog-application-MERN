import { UserModel } from "../models/user.js";
import { registerValidator } from "../models/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"


export const register = async (req, res, next) => {
    try {
        //Validate request
        const {
            firstName,
            lastName,
            email,
            password,
            image,
            accountType,
            provider,
            error
        } = registerValidator.validate(req.body);
        if (error) {
            return res.status(422).json(error);
        }
        const userExist = await Users.findOne({ email });
        if (userExist) {
            return next("Email Address already exists. Try Login");
        }
        //Encrypt user password
        const hashedPassword = bcrypt.hashSync(password, 10);
        //Create user
        await UserModel.create({
            name: firstName + " " + lastName,
            email,
            password: hashedPassword,
            image,
            accountType,
            provider,
        });
        //send email verification if account type is writer
        if (accountType === "writer") {
            sendVerificationEmail(user, res, token);
        } else {
            //Return response
            res.status(201).json({
                success: true,
                message: "Account created successfully",
            });
        }
    } catch (error) {
        next(error)
    }
}

export const googleSignup = async (req, res, next) => {
    try {
        const { name, email, image, emailVerified } = req.body;

        const userExist = await UserModel.findOne({ email });

        if (userExist) {
            next("Email Address already exists. Try Login");
            return;
        }

        const user = await UserModel.create({
            name,
            email,
            image,
            password: hashedPassword,
            provider: "Google",
            emailVerified,
        });

        const token = createJWT(user?._id);

        res.status(201).json({
            success: true,
            message: "Account created successfully",
            user,
            token,
        });
    } catch (error) {
        next(error)
    }
}
export const login = async (req, res, next) => {
    try {
        // Validate request
        const { username, email, password, error } = loginValidator.validate(req.body);
        if (error) {
            return res.status(422).json(error);
        }
        // Find a user with their unique identifier
        const user = await UserModel.findOne({
            $or: [
                { username },
                { email },
            ]
        });
        if (!user) {
            return res.status(401).json('User not found');
        }
        // Google account signed in
        if (!password && user?.provider === "Google") {
            const token = createJWT(user?._id);

            return res.status(201).json({
                success: true,
                message: "Login successfully",
                user,
                token,
            });
        }
        // Verify their password
        const correctPassword = bcrypt.compareSync(password, user.password);
        if (!correctPassword) {
            return res.status(401).json('Invalid credentials');
        }
        // Create a token
        const token = jwt.sign(
            { id: user.id },
            process.env.JWT_PRIVATE_KEY,
            { expiresIn: '1h' }
        );
        // Return response
        res.status(200).json({
            message: 'User logged in',
            accessToken: token
        });
    } catch (error) {
        next(error)
    }
}
export const registe = async (req, res, next) => {
    try {

    } catch (error) {
        next(error)
    }
}
export const logout = async (req, res, next) => {
    try {
        // Destroy user session
        await req.session.destroy();
        // Return response
        res.status(200).json('User logged out');
    } catch (error) {
        next(error)
    }
}