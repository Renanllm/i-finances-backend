require('dotenv').config();

const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const requireDir = require('require-dir');

const server = express();

server.use(cors());
server.use(express.json());

mongoose
    .connect(process.env.MONGO_URL, {
        useUnifiedTopology: true,
        useNewUrlParser: true,
    })
    .then(() => console.log('DB Connected!'))
    .catch(err => {
        console.log('Error!');
    });
requireDir('./models');

server.use('/api', require('./routes'));

server.listen((process.env.PORT || 3000), () => console.log('Server start :)'));