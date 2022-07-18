const router = require('express').Router();
const commentController = require('../controllers/commentController')
const verifyToken = require('../middleware/verifyJWTToken')
router.post('/add', commentController.addCmt)
router.get('/', commentController.getAllCmt)
router.delete('/delete/:id', commentController.deleteCmt)

module.exports = router;