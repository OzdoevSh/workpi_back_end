import Router = require('express');
import userRouter = require('./userRouter')

const router = new Router();

router.use('/user', userRouter)

module.exports = router