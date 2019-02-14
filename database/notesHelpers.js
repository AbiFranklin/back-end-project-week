const knex = require('knex');

const db_config = require('../knexfile.js');

const db = knex(db_config.development);

module.exports = {
    getPosts: () => {
        return db('posts').join('users', 'posts.user_id', 'users.id').select('posts.title', 'posts.text', 'posts.category', 'users.username')
    },

    getPost: (id) => {
        return db('posts').join('users', 'posts.user_id', 'users.id').where('posts.id', id).select('posts.title', 'posts.text', 'posts.category', 'users.username');
    },

    updatePost: (note) => {
        return db('posts').update(note);
    },

    deletePost: (id) => {
       return db('posts').where('id', id).del()
    },

    addPost: (note) => {
        return db('posts').insert(note)
    },

    addUser: (user) => {
        return db('users').insert(user)
    }

}