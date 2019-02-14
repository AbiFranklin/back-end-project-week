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

  server.get('/api/posts/:id', (req, res) => {
    const {id} = req.params;
    noteHelpers.getPost(id)
    .then(arr => {
      if (arr.length > 0) {
      res.status(200).json(arr)
      } else {
        res.status(404).json({ error: 'No note for given id.'})
      }
    })
    .catch(err => {
     res.status(500).json({ error: 'Failed to retrieve note.'})
     }) 
   });

server.listen(8000, () => {
    console.log('API listening on port 8000');
})