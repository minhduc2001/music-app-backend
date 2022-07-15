const User = require('../models/User')
const cloudinary = require('../config/cloudinary')

class UserController {

    async getAllUsers(req, res) {
        try {
            const users = await User.find();
            return res.status(200).json({ users: users });
        } catch (error) {
            return res.status(500).json(error);
        }
    }

    async deleteUser(req, res) {
        try {
            const user = await User.findById(req.params.id);
            if (!user) {
                return json.status(404).json('This user does not exist')
            }
            return res.status(200).json({ msg: 'User deleted' })
        } catch (error) {
            return res.status(500).json(error);
        }
    }

    async updateUser(req, res) {
        try {
            const user = await User.findByIdAndUpdate({ _id: req.params.id },
                req.body
                , { new: true }
            );

            // const { password, ...other } = user._doc;
            user.password = ''
            return res.status(200).json(user);
        } catch (error) {
            return res.status(500).json(error);

        }
    }
    async setAvatar(req, res) {

        try {

            const result = await cloudinary.uploader.upload(req.body.avatar, {
                folder: "avatar",
            })
            const user = await User.findByIdAndUpdate({ _id: req.params.id }, {
                avatar: {
                    public_id: result.public_id,
                    url: result.secure_url
                }
            }, { new: true });
            user.password = '';
            return res.status(200).json(user);
        } catch (error) {
            return res.status(500).json(error);
        }
    }

}

module.exports = new UserController;