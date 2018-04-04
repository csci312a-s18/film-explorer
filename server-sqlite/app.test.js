/* eslint-disable arrow-body-style */
const request = require('supertest');
const { app, knex } = require('./app');

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

describe('Film Explorer API', () => {
  beforeEach(() => {
    return knex.migrate.rollback()
      .then(() => knex.migrate.latest())
      .then(() => knex.seed.run());
  });

  afterEach(() => {
    return knex.migrate.rollback();
  });

  // SuperTest has several helpful methods for conveniently testing responses
  // that we can use to make the tests more concises

  test('GET /api/movies should return all movies (mostly SuperTest)', () => {
    return request(app).get('/api/movies')
      .expect(200)
      .expect('Content-Type', /json/)
      .expect([movie]);
  });

  test('PUT /api/movies/:id should update the movie (mostly SuperTest)', () => {
    const newMovie = Object.assign({}, movie, { rating: 4 });
    return request(app).put('/api/movies/135397').send(newMovie)
      .expect(200)
      .expect('Content-Type', /json/)
      .expect(newMovie);
  });

  test('PUT /api/movies/:id should update the movie genres', () => {
    const newMovie = Object.assign({}, movie, { genre_ids: [12, 42] });
    return request(app).put('/api/movies/135397').send(newMovie)
      .expect(200)
      .expect('Content-Type', /json/)
      .expect(newMovie);
  });

  test('GET /api/movies/:id should return movie (mostly SuperTest)', () => {
    return request(app).get(`/api/movies/${movie.id}`)
      .expect(200)
      .expect('Content-Type', /json/)
      .expect(movie);
  });
});
