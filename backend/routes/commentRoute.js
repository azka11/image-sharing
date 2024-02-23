const express = require('express');
const router = express.Router();
const commentController = require('../controllers/commentController')
const { authenticateUser } = require('../middleware/authtentication')


router.get('/', commentController.getAllComment)
router.get('/photo/:id', commentController.getCommentByPhoto)

router.use(authenticateUser)
router.post('/create/:photo_id', commentController.createComment)
router.put('/update/:id', commentController.editComment)

router.route('/:id')
.get(commentController.getByIdComment)
.delete(commentController.deleteComment)

module.exports = router;