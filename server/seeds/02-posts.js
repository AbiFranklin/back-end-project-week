
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('posts').del()
    .then(function () {
      // Inserts seed entries
      return knex('posts').insert([
        {id: 1, title: 'Hi', text: 'My name is Abi.', user_id: 1},
        {id: 2, title: 'Howdy', text: 'My name is Patrick', user_id: 2},
        {id: 3, title: 'Hello', text: 'My name is Robin', user_id: 3}
      ]);
    });
};
