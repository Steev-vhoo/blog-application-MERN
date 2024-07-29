import { CommentModel } from "../models/comments.js";
import { PostModel } from "../models/post.js";



export const commentPost = async (req, res, next) => {
    try {
        const { desc } = req.body;
        const { userId } = req.body.user;
        const { id } = req.params;

        if (desc === null) {
            return res.status(404).json({ message: "Comment is required." });
        }

        const newComment = new Comments({ desc, user: userId, post: id });

        await newComment.save();

        //updating the post with the comments id
        const post = await PostModel.findById(id);

        post.comment.push(newComment._id);

        await PostModel.findByIdAndUpdate(id, post, {
            new: true,
        });

        res.status(201).json({
            success: true,
            message: "Comment published successfully",
            newComment,
        });
    } catch (error) {
        console.log(error);
        res.status(404).json({ message: error.message });
    }
};

export const getComments = async (req, res, next) => {
    try {
        const { postId } = req.params;

        const postComments = await Comments.find({ post: postId })
            .populate({
                path: "user",
                select: "name image -password",
            })
            .sort({ _id: -1 });

        res.status(200).json({
            sucess: true,
            message: "successfully",
            data: postComments,
        });
    } catch (error) {
        console.log(error);
        res.status(404).json({ message: error.message });
    }
};

export const deleteComment = async (req, res, next) => {
    try {
        const { id, postId } = req.params;

        await CommentModel.findByIdAndDelete(id);

        //removing commetn id from post
        const result = await PostModel.updateOne(
            { _id: postId },
            { $pull: { comments: id } }
        );

        if (result.modifiedCount > 0) {
            res
                .status(200)
                .json({ success: true, message: "Comment removed successfully" });
        } else {
            res.status(404).json({ message: "Post or comment not found" });
        }
    } catch (error) {
        console.log(error);
        res.status(404).json({ message: error.message });
    }
};