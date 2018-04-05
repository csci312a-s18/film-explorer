/* eslint-disable func-names, camelcase */
/* eslint no-unused-vars: ["error", { "args": "none" }] */
const { Model, transaction } = require('objection');
const User = require('../../models/User');
const Rating = require('../../models/Rating');

exports.seed = function (knex, Promise) {
  // Bind all Models to a knex instance
  Model.knex(knex);

  // Because seeds are applied in alphabetical order, the Movie should
  // already be loaded

  // Deletes ALL existing entries
  /* eslint-disable arrow-body-style */
  return Promise.all([knex('User').del(), knex('Rating').del()])
    .then(() => {
      // Insert the graph as a single transaction
      return transaction(User.knex(), trx => Promise.all([
        User.query(trx).insert({}),
        User.query(trx).insert({}),
      ]));
    })
    .then(() => {
      return transaction(Rating.knex(), trx => Rating.query(trx).insert({
        movieId: 135397,
        userId: 1,
        rating: 2,
      }));
    });
};
