import { Router } from "express";
import { statsView } from "../controllers/view.js";
import { statsFollower } from "../controllers/followers.js";
import { statsPost } from "../controllers/post.js";





const postRouter = Router();

// ADMIN ROUTES
postRouter.post("/admin-analytics", userAuth, stats);
postRouter.post("/admin-followers", userAuth, getFollowers);
postRouter.post("/admin-content", userAuth, getPostContent);
postRouter.post("/create-post", userAuth, createPost);

// LIKE & COMMENT ON POST
postRouter.post("/comment/:id", userAuth, commentPost);

// UPDATE POST
postRouter.patch("/update/:id", userAuth, updatePost);

// GET POSTS ROUTES
postRouter.get("/", getPosts);
postRouter.get("/popular", getPopularContents);
postRouter.get("/:postId", getPost);
postRouter.get("/comments/:postId", getComments);

// DELETE POSTS ROUTES
postRouter.delete("/:id", userAuth, deletePost);
postRouter.delete("/comment/:id/:postId", userAuth, deleteComment);

export default postRouter;