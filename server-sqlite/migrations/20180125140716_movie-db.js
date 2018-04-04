/* eslint-disable func-names */
/* eslint no-unused-vars: ["error", { "args": "none" }] */
exports.up = function (knex, Promise) {
  return knex.schema
    .createTable('Movie', (table) => {
      table.integer('id').unsigned().primary();
      table.text('overview');
      table.string('release_date');
      table.string('poster_path');
      table.string('title');
      table.float('vote_average');
      table.integer('rating');
    })
    .createTable('Genre', (table) => {
      table.integer('movieId').unsigned().references('id').inTable('Movie').onDelete('CASCADE');
      table.integer('genreId');
      table.primary(['movieId', 'genreId']);
    });
};

exports.down = function (knex, Promise) {
  return knex.schema
    .dropTableIfExists('Genre')
    .dropTableIfExists('Movie');
};
