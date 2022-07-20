const Music = require('../models/Music');
const songs = require('../public/songs.json')
const APIFeatures = require('../lib/features');

class MusicController {
    async getAllMusic(req, res, next) {
        try {
            const musics = await Music.find().sort({ id: 1 });
            return res.status(200).json(musics);
        } catch (error) {
            res.status(500).json(error)
        }

    }
    async searchMusic(req, res, next) {
        try {
            const features = new APIFeatures(Music.find(), req.query).searching();

            const result = await Promise.allSettled([
                features.query
            ]);
            const musics = result[0].status === 'fulfilled' ? result[0].value : [];
            return res.status(200).json(musics);
        } catch (error) {
            return res.status(500).json(error);
        }
    }

    async addMusic(req, res, next) {
        try {
            const music = new Music(req.body);
            await music.save();
            return res.status(200).json({msg : 'Added music successfully!'});
        } catch (error) {
            return res.status(500).json(error);
        }
    }


}

module.exports = new MusicController();