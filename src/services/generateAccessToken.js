require('dotenv').config();
const jwt = require('jsonwebtoken')

class GenerateAccessToken {
    accessToken(user) {
        return jwt.sign(
            {
                id: user.id,
                isAdmin: user.isAdmin
            },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: '1d' }
        )
    }
    refreshToken(user) {
        return jwt.sign(
            {
                id: user.id,
                isAdmin: user.isAdmin
            },
            process.env.REFRESH_TOKEN_SECRET,
            { expiresIn: '30d' }
        )
    }
}

module.exports = new GenerateAccessToken();