/* eslint-disable arrow-body-style */
const knexConfig = require('../knexfile');
const knex = require('knex')(knexConfig[process.env.NODE_ENV || 'test']);
const Movie = require('./Movie');
const Genre = require('./Genre');

const movie = {
  id: 135397,
  overview: 'Twenty-two years after ...',
  release_date: '2015-06-12',
  poster_path: '/jjBgi2r5cRt36xF6iNUEhzscEcb.jpg',
  title: 'Jurassic World',
  vote_average: 6.9,
  rating: null,
  genre_ids: [12, 28, 53, 878],
};

describe('FilmExplorer Movie Model', () => {
  test('Model translates genre_ids to Genres and back again', () => {
    const modelMovie = Movie.fromJson(movie);
    expect(modelMovie).toHaveProperty(
      'genres',
      expect.arrayContaining(movie.genre_ids.map(genreId => ({ genreId, movieId: movie.id }))),
    );
    expect(modelMovie.toJSON()).toEqual(movie);
  });

  describe('Film Explorer Movie Schema', () => {
    beforeEach(() => {
      return knex.migrate.rollback()
        .then(() => knex.migrate.latest())
        .then(() => knex.seed.run());
    });

    test('Deleting Movies deletes Genres', () => {
      return Genre.query().then((genres) => {
        expect(genres).not.toHaveLength(0);
        return Movie.query().delete();
      }).then((numDeleted) => {
        expect(numDeleted).toBe(1);
        return Genre.query();
      }).then((genres) => {
        expect(genres).toHaveLength(0);
      });
    });

    test('Adding Rating from Movie with ratings', () => {
      return Movie.query().findById(135397)
        .then((modelMovie) => {
          return modelMovie.$relatedQuery('ratings').insert({
            userId: 2,
            rating: 4,
          }).return(modelMovie);
        })
        .then((modelMovie) => {
          // At this point we only have the single rating we just added
          return modelMovie.$query().eager('ratings');
        })
        .then((modelMovie) => {
          expect(modelMovie.ratings).toHaveLength(2);
        });
    });

    test('Adding Rating from Movie with users', () => {
      return Movie.query().findById(135397)
        .then((modelMovie) => {
          return modelMovie.$relatedQuery('users').relate({
            id: 2,
            rating: 4,
          }).return(modelMovie);
        })
        .then((modelMovie) => {
          return modelMovie.$query().eager('users');
        })
        .then((modelMovie) => {
          expect(modelMovie).toHaveProperty('users');
        });
    });

    afterEach(() => {
      return knex.migrate.rollback();
    });
  });
});
