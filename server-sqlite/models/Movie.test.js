const Movie = require('./Movie');

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

describe('FilmExplorer Models', () => {
  test('Model translates genre_ids to Genres and back again', () => {
    const modelMovie = Movie.fromJson(movie);
    expect(modelMovie).toHaveProperty(
      'genres',
      expect.arrayContaining(movie.genre_ids.map(genreId => ({ genreId, movieId: movie.id }))),
    );
    expect(modelMovie.toJSON()).toEqual(movie);
  });
});
