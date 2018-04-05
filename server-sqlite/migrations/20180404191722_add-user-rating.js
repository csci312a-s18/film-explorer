/* eslint-disable func-names */
/* eslint no-unused-vars: ["error", { "args": "none" }] */
exports.up = function (knex, Promise) {
  return knex.schema
    .createTable('User', (table) => {
      table.increments('id');
    })
    .createTable('Rating', (table) => {
      table.integer('userId').references('id').inTable('User').onDelete('CASCADE');
      table.integer('movieId').unsigned().references('id').inTable('Movie')
        .onDelete('CASCADE');
      table.integer('rating').unsigned().notNullable();
      table.primary(['userId', 'movieId']);
    });
};

exports.down = function (knex, Promise) {
  return knex.schema
    .dropTableIfExists('Rating')
    .dropTableIfExists('User');
};
