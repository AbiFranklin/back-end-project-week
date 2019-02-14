const express = require('express');
const server = express();
const noteHelpers = require('./database/notesHelpers.js');

server.use(express.json());

server.get('/api/posts', (req, res) => {
    noteHelpers.getPosts()
    .then(posts => {
      res.status(200).json({ posts });
    })
    .catch(err => {
      res.status(500).json({ error: "Error returning notes."});
    })
  });

server.listen(8000, () => {
    console.log('API listening on port 8000');
})