
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('posts').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('posts').insert([
        {title: 'Day 1', text: 'Today was good.', category: 'Work', user_id: 1},
        {title: 'Day 2', text: 'Today was ok.', category: 'Home', user_id: 2},
        {title: 'Day 3', text: 'Today was bad.', category: 'Personal', user_id: 3},
      ]);
    });
};