const express = require('express');

const router = express.Router();

const queries = require('../db/queries');

function isValidId(req, res, next) {
    if(!isNaN(req.params.id)) return next();
    next(new Error('Invalid ID'));
}

function validPost(post) {
    const hasTitle = typeof post.title == 'string' && post.title.trim() != '';
    const hasText = typeof post.text == 'string' && post.text.trim() != '';

    return hasTitle && hasText;
}

router.get('/', (req, res) => {
    queries.getAll()
    .then(posts => {
        res.status(200).json(posts);
    })
    .catch(err => {
        res.status(500).json(err);
    })
});

router.get('/:id', isValidId, (req, res) => {
    queries.getOne(req.params.id)
    .then(post => {
        if(post.length > 0) {
            res.status(200).json(post);
        } else {
            res.status(404).json({
                error: 'No post with that ID'
            })
        }
    })
    .catch(err => {
        res.status(500).json(err);
    })
})

router.post('/', (req, res, next) => {
    if(validPost(req.body)) {
        queries.createPost(req.body)
        .then(posts => {
            res.status(201).json(posts);
        })
        .catch(err => {
            res.status(500).json({
                error: 'Failed to post note'
            })
        })
    } else {
        res.status(500).json({
            error: 'Invalid Post'
        })
    }
});

module.exports = router;