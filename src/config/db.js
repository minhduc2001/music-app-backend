const mongoose = require('mongoose');
require('dotenv').config();

module.exports = mongoose.connect(process.env.MONGODB_URL_ONLINE, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('Connected to Mongo database successfully');
}).catch(() => {
    console.log('Failed to connect to Mongo database')
})