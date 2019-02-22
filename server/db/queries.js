const knex = require('./knex');



module.exports = {
    getAll() {
        return knex('posts').join('users', 'posts.user_id', 'users.id').select('posts.id', 'posts.title', 'posts.text', 'users.username').orderBy('posts.id');
    },

    getOne(id) {
        return knex('posts').join('users', 'posts.user_id', 'users.id').where('posts.id', id).select('posts.title', 'posts.text', 'users.username');
    },

    createPost(post) {
        return knex('posts').insert(post, '*');
    },

    editPost(id, post) {
        return knex('posts').where('id', id).update(post, '*');
    },

    delPost(id) {
        return knex('posts').where('id', id).del();
    }
}