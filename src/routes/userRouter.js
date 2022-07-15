const router = require('express').Router();
const userController = require('../controllers/userController')
const verifyJWTToken = require('../middleware/verifyJWTToken');


router.get('/', verifyJWTToken.verifyToken, userController.getAllUsers)
router.delete('/user/:id', verifyJWTToken.verifyTokenAndAdmin, userController.deleteUser)
router.put('/user/:id', verifyJWTToken.verifyToken, userController.updateUser);
router.post('/avatar/:id', verifyJWTToken.verifyToken, userController.setAvatar)

module.exports = router;