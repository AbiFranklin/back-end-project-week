exports.up = function(knex, Promise) {
    return knex.schema.createTable('posts', (table) => {
      table.increments();
      table.text('title');
      table.text('text');
      table.integer('user_id');
      table.foreign('user_id').references('users.id');
    });
  };
  
  exports.down = function(knex, Promise) {
    return knex.schema.dropTable('posts');
  };
