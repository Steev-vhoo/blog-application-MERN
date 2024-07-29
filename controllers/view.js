import { ViewModel } from "../models/view.js";

export const stats = async (req, res, next) => {
    try {
        const { query } = req.query;
        const { userId } = req.body.user;

        const numofDays = Number(query) || 28;

        const currentDate = new Date();
        const startDate = new Date();
        startDate.setDate(currentDate.getDate() - numofDays);

        const totalViews = await ViewModel.find({
            user: userId,
            createdAt: { $gte: startDate, $lte: currentDate },
        }).countDocuments();

        const viewStats = await Views.aggregate([
            {
                $match: {
                    user: new mongoose.Types.ObjectId(userId),
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
            message: "Data loaded successfully", totalViews, viewStats
        })
    } catch (error) {
        next(error)
    }
}