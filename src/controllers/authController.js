const User = require('../models/User')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
require('dotenv').config();
const generateAccessToken = require('../services/generateAccessToken')
// const sendMail = require('../services/sendEmail');

class AuthController {
    async register(req, res) {
        try {
            const salt = bcrypt.genSaltSync(10);
            const hashedPassword = bcrypt.hashSync(req.body.password, salt);
            const checkUser = await User.findOne({ username: req.body.username});

            if(checkUser) return res.status(500).json({msg:'Username already in use!'})
            const checkPhone = await User.findOne({ phone: req.body.phone });
            if (checkPhone) return res.status(500).json({ msg: 'Phone already exists!' });
            const newUser = new User({
                username: req.body.username,
                phone: req.body.phone,
                password: hashedPassword
            })
            const user = await newUser.save();
            return res.status(200).json(user)
        } catch (error) {
           return res.status(500).json(error);
        }
    }

    async login(req, res) {
        try {
            const user = await User.findOne({ username: req.body.username });
            if (!user) {
                return res.status(500).json({ msg: 'Username or Password incorrect!' })
            }

            const isPasswordValid = bcrypt.compareSync(req.body.password, user.password);
            if (!isPasswordValid) {
                return res.status(500).json({ msg: 'Username or Password incorrect!' })
            }

            if (!user.isActive) {
                return res.status(500).json({ msg: 'Account is not active!' })
            }
            const accessToken = generateAccessToken.accessToken(user);
            const refreshToken = generateAccessToken.refreshToken(user);

            res.cookie('refreshToken', refreshToken, {
                httpOnly: true,
                secure: true, //true
                path: '/',
                sameSite: 'strict',
                maxAge: 24 * 60 * 60 * 1000

            })
            const { password, ...other } = user._doc;

            return res.status(200).json({
                ...other,
                accessToken
            })
        } catch (error) {
           return res.status(500).json(error);
        }
    }

    async requestRefreshToken(req, res, next) {
        try {
            const refreshToken = req.cookies.refreshToken;
            console.log(req.cookies);
            if (!refreshToken) return res.status(403).json('You are not authenticated!');
            jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
                if (err) return res.status(err).json('You are not authenticated');

                const newAccessToken = generateAccessToken.accessToken(user);
                const newRefreshToken = generateAccessToken.refreshToken(user);

                res.cookie('refreshToken', newRefreshToken, {
                    httpOnly: true,
                    secure: true, //true
                    path: '/',
                    sameSite: 'strict',
                    maxAge: 24 * 60 * 60 * 1000
                })

                return res.status(200).json({ accessToken: newAccessToken })
            })
        } catch (error) {
            return res.status(500).json({ msg: error.message })
        }
    }

    async logout(req, res) {
        res.clearCookie('refreshToken');
        return res.status(200).json('Logged out!');
    }

    async PWReset(req, res) {
        try {
            const { phone } = req.body;
            console.log(phone);
            const user = await User.findOne({ phone });
            if (!user) return res.status(500).json({ msg: 'User not found' });

            return res.status(200).json({ phone: phone });
        }
        catch (error) {
           return res.status(500).json(error);
        }
    }

    async activeUser(req, res) {
        try {
            const { phone } = req.body;
            const user = await User.findOneAndUpdate({ phone: phone }, { isActive: true }, { new: true });
            if (!user) return res.status(500).json({ msg: 'User not found' });
            return res.status(200).json({ msg: 'Active successfully' });
        } catch (error) {
           return res.status(500).json(error);
        }
    }

    async randomPassword(req, res, next) {
        try {
            const newPassword = (Math.floor(Math.random() * 899999) + 100000).toString();
            const salt = bcrypt.genSaltSync(10);
            const hashedNewPassword = bcrypt.hashSync(newPassword, salt);
            await User.findOneAndUpdate({ phone: req.body.phone }, { password: hashedNewPassword }, { new: true });

            return res.status(200).json({ msg: newPassword });
        } catch (error) {
           return res.status(500).json(error);
        }
    }
}

module.exports = new AuthController();