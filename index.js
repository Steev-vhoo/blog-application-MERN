//Import packages
import express from "express";
import mongoose from "mongoose";
import userRouter from "./routes/user.js";
import postRouter from "./routes/post.js";
// Make database connection
await mongoose.connect(process.env.MONGO_URI);
console.log(`Blog database connected and ready`);
// Create app
const app = express();
// Use middleware
// Use routes
app.use(userRouter)
app.use(postRouter)
// Listen for incoming request
const port = process.env.PORT || 5885
app.listen(port, () => {
    console.log(
        `Server running on port ${port}`
    )
})