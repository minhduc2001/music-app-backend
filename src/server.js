const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser')
const router = require('./routes/route');
const morgan = require('morgan');
require('./config/db')
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json({limit: '50mb'}));
app.use(cors({credentials: true, origin: 'https://stream-e2870.web.app'}));
app.use(cookieParser());
app.use(morgan('dev'));
router(app);

app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`);
})