const userRouter = require('./userRouter');
const authRouter = require('./authRouter');
const musicRouter = require('./musicRouter');
const commentRouter = require('./commentRouter');
const router = (app) => {
    app.use('/api/auth', authRouter);
    app.use('/api/users', userRouter);
    app.use('/api/music', musicRouter);
    app.use('/api/comment', commentRouter)
}

module.exports = router;