const express = require('express');

const server = express();

server.use(express.json());

server.listen(8000, () => {
    console.log('API listening on port 8000');
})