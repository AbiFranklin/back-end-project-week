
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {id: 1, username: 'Abi'},
        {id: 2, username: 'Patrick'},
        {id: 3, username: 'Robin'}
      ]);
    });
};
