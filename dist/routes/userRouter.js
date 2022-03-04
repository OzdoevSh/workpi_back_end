"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var Router = require('express');
var router = new Router();
var userController = require('../controllers/UserController');
var authMiddleware_1 = __importDefault(require("../middleware/authMiddleware"));
router.post('/registration', userController.registration);
router.post('/login', userController.login);
router.get('/auth', authMiddleware_1["default"], userController.isAuth);
router.get('/:id', userController.getUserData);
module.exports = router;
