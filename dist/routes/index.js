"use strict";
exports.__esModule = true;
var Router = require('express');
var router = new Router();
var userRouter = require('./userRouter');
router.use('/user', userRouter);
module.exports = router;
