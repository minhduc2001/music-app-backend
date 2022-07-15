const router = require('express').Router();

const musicController = require('../controllers/musicController')
const verifyJWTToken = require('../middleware/verifyJWTToken')
router.post('/add', musicController.addMusic);
router.get('/', verifyJWTToken.verifyToken, musicController.getAllMusic)
router.get('/search', musicController.searchMusic);

module.exports = router;