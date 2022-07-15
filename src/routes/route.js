const userRouter = require('./userRouter');
const authRouter = require('./authRouter');
const musicRouter = require('./musicRouter');
const router = (app) => {
    app.use('/api/auth', authRouter);
    app.use('/api/users', userRouter);
    app.use('/api/music',musicRouter);
}

module.exports = router;