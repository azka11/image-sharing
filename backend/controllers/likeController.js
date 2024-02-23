const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const likeController = {
    getAllLike: async (req, res) => {
        const user_id = req.user
        try {
            const like = await prisma.likes.findMany({
                where: {user_id: user_id}
            })
            res.status(200).json({message: "Successfuly found likes", like})
        } catch (error) {
            console.log(error)
            res.status(400).json({ message: "error find likes" });
        }
    },

    getLikeByPhoto: async (req, res) => {
        const { id } = req.params
        try {
            const likeOnPhoto = await prisma.likes.findMany({
                where: {photo_id: Number(id)},
                include : {
                    users: {
                        select: {
                            username: true
                        }
                    }
                }
            })
            res.status(200).json({message: "like on photo has found", likeOnPhoto})
        } catch (error) {
            console.log(error)
            res.status(400).json({ message: "like not found" });
        }
    },

    createLike: async (req, res) => {
        const user_id = req.user;
        const { photo_id } = req.body;
        if (!user_id || !photo_id) {
            return res.status(400).json({ message: "user_id and photo_id are required" });
        }
        try {
            const like = await prisma.likes.create({
                data: {
                    user_id,
                    photo_id: Number(photo_id)
                }
            });
            res.status(200).json({ message: "successfully created like", like });
        } catch (error) {
            console.log(error);
            res.status(400).json({ message: "error creating like" });
        }
    },

    deleteLike: async (req, res) => {
        const { id } = req.params
        try {
            const like = await prisma.likes.delete({
                where: {like_id: Number(id)}
            })
            res.status(200).json({message: "sucessfuly delete like", like})
        } catch (error) {
            console.log(error)
            res.status(400).json({ message: "error delete likes" });
        }
    }
    
}

module.exports = likeController;