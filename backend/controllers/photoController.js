const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const photoController = {
    getAllPhoto: async (req, res) => {
        try {
            const photo = await prisma.photos.findMany({
                include: {
                    users :{
                        select :{
                            username : true,
                            image: true
                        }
                    }
                }
            });
            res.status(200).json({ message: "Successfully found photo posts", photo})
          } catch (error) {
            console.log(error)
            res.status(400).json({ message: "Photo post not found" });
          }
    },

    getAllPhotoByUser: async (req, res) => {
        try {
            const user_id = req.user
            const photo = await prisma.photos.findMany({
              where: {
                user_id: parseInt(user_id),
            }, 
            include: {
                users :{
                    select :{
                        username : true,
                        image: true
                    }
                }
            }
            });
            res.status(200).json({ message: "Successfully found photo posts", photo})
          } catch (error) {
            console.log(error)
            res.status(400).json({ message: "Photo post not found" });
          }
    },

    searchPhoto: async (req, res) => {
        try {
            const { searchTerm } = req.body; // Dapatkan searchTerm dari body permintaan

        // Lakukan pencarian menggunakan Prisma
            const photo = await prisma.photos.findMany({
            where: {
                photo_title: {
                    startsWith: searchTerm // Cocokkan bagian awal dari photo_title dengan searchTerm
                }
            }
        });
            res.status(200).json({ message: "Successfully found photo posts", photo})
          } catch (error) {
            console.log(error)
            res.status(400).json({ message: "Photo post not found" });
          }
    },

    getPhotoById: async (req, res) => {
        const { id } = req.params
        try {
            const photo = await prisma.photos.findUnique({where: {photo_id: Number(id)}})
            res.status(200).json({ message: `Successfully found photo post id ${id}`, photo})
        } catch (error) {
            console.log(error)
            res.status(400).json({ message: "Photo post not found" });
        }
    },

    createPhoto: async (req, res) => {
        const { photo_title, description } = req.body
        const user_id = req.user
        const photo_img = req.file ? req.file.path : 'default_path_if_file_not_present';
        const photopath = photo_img.replace(/uploads\\/, "uploads/");
        try {
            const photo = await prisma.photos.create({
            data : {
                user_id,
                photo_title,
                description,
                photo_img: photopath
            }
            })
            res.status(200).json({ message: `Successfully create photo post`, photo})
        } catch (error) {
            console.log(error)
            res.status(400).json({ message: "Failed to create new photo post" });
        }
    },

    editPhoto: async (req, res) => {
        const { id } = req.params
        const {photo_title, description} = req.body
        const user_id = req.user
        try {
            const photo = await prisma.photos.update({
            where: {photo_id: Number(id)},
            data: {
                user_id,
                photo_title,
                description,
            }
            })
            res.status(200).json({ message: `Successfully update photo post`, photo})
        } catch (error) {
            console.log(error)
            res.status(400).json({ message: "Failed to update photo post" });
        }
    },

    deletePhoto: async (req, res) => {
        const { id } = req.params
        try {
            photo = await prisma.photos.delete({
                where: {photo_id: Number(id)}
            })
            res.status(200).json({message: "Successfully Delete Photo Post"})
        } catch (error) {
            console.log(error)
            res.status(400).json({ message: "Failed to delete photo post" });
        }
    }
}

module.exports = photoController;