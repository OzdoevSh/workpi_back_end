import Router = require('express');
import userController = require('../controllers/UserController');
import isAuth from '../middleware/authMiddleware';

const router = new Router()

router.post('/registration', userController.registration)
router.post('/login', userController.login)
router.get('/auth', isAuth, userController.isAuth)
router.get('/:id', userController.getUserData)


module.exports = router