import { Router } from "express";
import { googleSignup, login, logout, register } from "../controllers/user.js";
import { OPTVerification } from "../middleware/auth.js";



const userRouter = Router();

userRouter.post("/register", register);
userRouter.post("/google-signup", googleSignup);
userRouter.post("/login", login);
userRouter.post("/login", logout);

userRouter.post("/verify/:userId/:otp", OPTVerification);
userRouter.post("/resend-link/:id", resendOTP);

// user routes
userRouter.post("/follower/:id", userAuth, followWritter);
userRouter.put("/update-user", userAuth, updateUser);

userRouter.get("/get-user/:id?", getWriter);

export default userRouter;