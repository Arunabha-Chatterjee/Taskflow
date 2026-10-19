db.tasks.aggregate([
    {
        $match: {
            _id: ObjectId('6ac73f63eaad7d4893b643c4'),
            userId: ObjectId('6ac73e8beaad7d4893b643c3')
        }
    },

    {
        $lookup: {
            from: "subtasks",
            localField: "_id",
            foreignField: "taskId",
            as: "subtasks"
        }
    },

    {$unwind: "$subtasks"},

    {
        $project: {
            subtasks:1
        }
    }
])