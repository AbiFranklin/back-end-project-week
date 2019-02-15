const express = require('express');
const cors = require('cors');
const server = express();
const noteHelpers = require('./database/notesHelpers.js');

server.use(cors());
server.use(express.json());


server.get('/api/posts', (req, res) => {
    noteHelpers.getPosts()
    .then(posts => {
      res.status(200).send(posts);
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

   server.put('/api/posts/:id', (req, res) => {
    const note = req.body;
    if (note.title && note.text && note.category && note.user_id){ 
    noteHelpers.updatePost(note)
    .then(count => {
      if (count) {
      res.status(200).json({ success: 'Updated note' });
      } else {
        res.status(404).json({ error: 'Note with that ID does not exist.' })
      }
    })
    .catch(err => {
      res.status(500).json({ error: 'Failed to update.'})
    })
    } else {
      res.status(400).json({ error: "Please provide a title, text, and category for your note." })
    }
  });

  server.delete('/api/posts/:id', (req,res) => {
    const {id} = req.params;
    noteHelpers.deletePost(id)
    .then(count => {
      res.status(200).json({ success: 'Note successfully deleted' })
    })
    .catch(err => {
      res.status(500).json({ error: 'Failed to delete note.' })
    })
  });

  server.post('/api/posts', (req, res) => {
    const note = req.body;
    if (note.title && note.text && note.category && note.user_id) {
        noteHelpers.addPost(note)
        .then(ids => {
            res.status(201).json(ids)
        })
        .catch(err => {
            res.status(500).json({err: 'Failed to add note'})
        })
    } else {
        res.status(400).json({ error: "Please provide a title, text, and category for your note." })
    }
})

server.post('/api/users', (req, res) => {
    const user = req.body;
    if (user.username) {
        noteHelpers.addUser(user)
        .then(ids => {
            res.status(201).json(ids)
        })
        .catch(err => {
            res.status(500).json({err: 'Failed to add user'})
        })
    } else {
        res.status(400).json({ error: "Please provide a username" })
    }
})



server.listen(8000, () => {
    console.log('API listening on port 8000');
})