const Comment = require('../models/Comment')

class CommentController {
    async addCmt(req, res) {
        try {
            const comment = new Comment(req.body);
            await comment.save();
            return res.status(200).json({ msg: 'Comment added successfully' });
        } catch (error) {
            return res.status(500).json(error)
        }
    }

    async getAllCmt(req, res) {
        try {
            const comment = await Comment.find().populate('user').populate('music').sort({ createdAt: -1 });
            return res.status(200).json(comment);
        } catch (error) {
            console.log(error.message);
            return res.status(500).json(error);
        }
    }

    async deleteCmt(req, res) {
        try {
            await Comment.findByIdAndDelete({ _id: req.params.id });
            return res.status(200).json({ msg: 'Comment deleted successfully' });
        } catch (error) {
            return res.status(500).json(error)
        }
    }
}

module.exports = new CommentController();