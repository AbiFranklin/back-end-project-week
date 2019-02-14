const knex = require('knex');

const db_config = require('../knexfile.js');

const db = knex(db_config.development);

module.exports = {
    getPosts: () => {
        return db('posts')
    },

    getPost: (id) => {
        return db('posts').where('id', id);
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