
exports.up = function(knex, Promise) {
    return knex.schema.createTable('posts', table => {
        table.increments();
        table.string('title').notNullable();
        table.string('text');
        table.string('category').notNullable();
        table.integer('user_id').unsigned();
        table.foreign('user_id').references('id').on('users')
    })
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists('posts');
};
