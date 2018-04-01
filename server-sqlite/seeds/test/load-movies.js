/* eslint-disable func-names, camelcase */
/* eslint no-unused-vars: ["error", { "args": "none" }] */
const { Model, transaction } = require('objection');
const Movie = require('../../models/Movie');

exports.seed = function (knex, Promise) {
  // Bind all Models to a knex instance
  Model.knex(knex);

  // Deletes ALL existing entries
  /* eslint-disable arrow-body-style */
  return Promise.all([knex('Movie').del(), knex('Genre').del()])
    .then(() => {
      // Insert the graph as a single transaction
      return transaction(Movie.knex(), trx => Movie.query(trx).insertGraph({
        id: 135397,
        overview: 'Twenty-two years after ...',
        release_date: '2015-06-12',
        poster_path: '/jjBgi2r5cRt36xF6iNUEhzscEcb.jpg',
        title: 'Jurassic World',
        vote_average: 6.9,
        genre_ids: [12, 28, 53, 878],
      }));
    });
};
