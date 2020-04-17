const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const requireDir = require('require-dir');

const server = express();

server.use(cors());
server.use(express.json());

mongoose
    .connect('mongodb://localhost:27017/ifinances', {
        useUnifiedTopology: true,
        useNewUrlParser: true,
    })
    .then(() => console.log('DB Connected!'))
    .catch(err => {
        console.log('Error!');
    });
requireDir('./models');

server.use('/api', require('./routes'));

server.listen(3000, () => console.log('Server start :)'));