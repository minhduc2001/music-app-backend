const jwt = require('jsonwebtoken');

class VerifyJWTToken {
    verifyToken(req, res, next) {
        const token = req.headers.token;

        if (token) {
            const accessToken = token.split(' ')[1];
            // console.log(accessToken);
            jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
                if (err) {
                    return res.status(403).json('Token is not valid');
                }
                req.user = user;
                // console.log('user', user);
                return next();
            })
        }
        else {
            return res.status(401).json("You're not authenticated");
        }
    }

    verifyTokenAndAdmin(req, res, next) {
        const verifyJWTToken = new VerifyJWTToken();
        verifyJWTToken.verifyToken(req, res, () => {
            console.log(req.user.isAdmin);
            if (req.user.id === req.params.id || req.user.isAdmin) {
                return next();
            }
            else {
                return res.status(403).json('You are not allowed to delete this user!');
            }
        })
    }
}
module.exports = new VerifyJWTToken();