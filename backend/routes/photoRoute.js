const express = require('express');
const router = express.Router();
const photoController = require('../controllers/photoController')
const uploadPhoto = require('../middleware/multer')
const { authenticateUser } = require('../middleware/authtentication')


router.get('/', photoController.getAllPhoto)
router.use(authenticateUser)

router.get('/user', photoController.getAllPhotoByUser)
router.post('/search', photoController.searchPhoto)
router.post('/create', uploadPhoto.single('photo_img'), photoController.createPhoto)

router.route('/:id')
.get(photoController.getPhotoById)
.delete(photoController.deletePhoto)

module.exports = router