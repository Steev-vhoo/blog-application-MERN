import { FollowerModel } from "../models/followers.js"
import { UserModel } from "../models/user.js";


export const statsFollower = async (req, res, next) => {
    try {
        const { query } = req.query;
    const { userId } = req.body.user;

    const numofDays = Number(query) || 28;

    const currentDate = new Date();
    const startDate = new Date();
    startDate.setDate(currentDate.getDate() - numofDays);

    const totalFollowers = await UserModel.findById(userId);

    const last5Followers = await UserModel.findById(userId).populate({
        path: "followers",
        options: { sort: { _id: -1 } },
        perDocumentLimit: 5,
        populate: {
          path: "followerId",
          select: "name email image accountType followers -password",
        },
      });

      const followersStats = await FollowerModel.aggregate([
        {
          $match: {
            writerId: new mongoose.Types.ObjectId(userId),
            createdAt: { $gte: startDate, $lte: currentDate },
          },
        },
        {
          $group: {
            _id: {
              $dateToString: { format: "%Y-%m-%d", date: "$createdAt" },
            },
            Total: { $sum: 1 },
          },
        },
        { $sort: { _id: 1 } },
      ]);
    //Return response
    res.status(200).json({
        success: true,
      message: "Data loaded successfully", totalFollowers, last5Followers, followersStats
    })
    } catch (error) {
        next(error)
    }
}

export const getFollowers = async (req, res, next) => {
    try {
      const { userId } = req.body.user;
  
      // pagination
      const page = Number(req.query.page) || 1;
      const limit = Number(req.query.limit) || 8;
      const skip = (page - 1) * limit; //2-1 * 8 = 8
  
      const result = await Users.findById(userId).populate({
        path: "followers",
        options: { sort: { _id: -1 }, limit: limit, skip: skip },
        populate: {
          path: "followerId",
          select: "name email image accountType followers -password",
        },
      });
  
      const totalFollowers = await Users.findById(userId);
  
      const numOfPages = Math.ceil(totalFollowers?.followers?.length / limit);
  
      res.status(200).json({
        data: result?.followers,
        total: totalFollowers?.followers?.length,
        numOfPages,
        page,
      });
    } catch (error) {
      console.log(error);
      res.status(404).json({ message: error.message });
    }
  };