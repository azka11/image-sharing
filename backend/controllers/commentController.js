const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const commentController = {
    getAllComment: async (req, res) => {
        try {
            const comment = await prisma.comments.findMany()
            res.status(200).json({message: "Successfuly found Comment", comment})
        } catch (error) {
            console.log(error)
            res.status(400).json({ message: "Comment not found" });
        }
    },
    
    getByIdComment: async (req, res) => {
        const { id } = req.params
        try {
            const comment = await prisma.comments.findUnique({
                where: {comment_id: Number(id)}
            })
            res.status(200).json({message: `Successfuly found comment` , comment})
        } catch (error) {
            console.log(error)
            res.status(400).json({ message: "Comment not found" });
        }
    },

    getCommentByPhoto: async (req, res) => {

        const { id } = req.params
        const photo = await prisma.photos.findUnique({
            where: {photo_id: Number(id)}
        })

        try {
            const commentOnPhoto = await prisma.comments.findMany({
                where: {
                    photo_id: photo.photo_id,
                },
                include: {
                    users :{
                        select :{
                            username : true,
                            image: true
                        }
                    }
                }
            })
            res.status(200).json({message: "comment on photo has found", commentOnPhoto})
        } catch (error) {
            console.log(error)
            res.status(400).json({ message: "Comment not found" });
        }
    },

    createComment: async (req, res) => {
        const { comment_text } = req.body
        const { photo_id } = req.params
        const user_id = req.user
        try {

            const comment = await prisma.comments.create({
                data: {
                    user_id,
                    photo_id: parseInt(photo_id),
                    comment_text
                }
            })
            res.status(201).json({ message: "Succesfully Create New Comment", comment })
        } catch (error) {
            console.log(error)
            res.status(400).json({ message: "error create new comment" });
        }
    },

    editComment: async (req, res) => {
        const { id } = req.params
        const user_id = req.user
        const { comment_text, photo_id } = req.body
        try {

            const comment = await prisma.comments.update({
                where: {comment_id: Number(id)},
                data: {
                    user_id,
                    photo_id,
                    comment_text
                }
            })
            res.status(201).json({ message: "Succesfully update Comment", comment })
        } catch (error) {
            console.log(error)
            res.status(400).json({ message: "error update comment" });
        }
    },

    deleteComment: async (req, res) => {
        const { id } = req.params
        try {
            const comment = await prisma.comments.delete({
                where: {comment_id: Number(id)}
            })
            res.status(200).json({ message: "Succesfuly Delete Comment" })
        } catch (error) {
            console.log(error)
            res.status(400).json({ message: "error delete comment" });
        }
    }
}


module.exports = commentController;