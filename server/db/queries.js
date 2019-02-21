const knex = require('./knex');



module.exports = {
    getAll() {
        return knex('posts').join('users', 'posts.user_id', 'users.id').select('posts.title', 'posts.text', 'users.username', 'posts.id');
    },

    getOne(id) {
        return knex('posts').join('users', 'posts.user_id', 'users.id').where('posts.id', id).select('posts.title', 'posts.text', 'users.username');
    },

    createPost(post) {
        return knex('posts').insert(post, '*');
    }
}