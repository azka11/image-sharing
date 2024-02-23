const express = require('express');
const router = express.Router();
const likeController = require('../controllers/likeController')
const { authenticateUser } = require('../middleware/authtentication')


router.get('/', likeController.getAllLike)
router.get('/photo/:id', likeController.getLikeByPhoto)

router.use(authenticateUser)
router.post('/create', likeController.createLike)
router.delete('/:id', likeController.deleteLike)

module.exports = router;