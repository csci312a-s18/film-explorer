/* eslint-disable camelcase */
const path = require('path');
const { Model } = require('objection');

class Movie extends Model {
  // Table name is the only required property.
  static get tableName() {
    return 'Movie';
  }

  // We override the JSON formatting and parsing so that we can use
  // a flat Array for genre_ids in our interface instead of nested objects, for
  // just accessing genre_ids as an array, we could use virtual attributes
  // http://vincit.github.io/objection.js/#virtualattributes

  // Render model to JSON with just genre_ids property, like
  // original MongoDB version, instead of nested genre objects
  $formatJson(json) {
    const { genres, ...extJson } = super.$formatJson(json); // Separate out genres
    return Object.assign(extJson, { genre_ids: this.genres.map(genre => genre.genreId) });
  }

  // Parse the genre_ids into nested objects to facilitate upsertGraph queries
  $parseJson(json, opt) {
    const { genre_ids, ...extJson } = json;
    const genres = (genre_ids || []).map(genreId => ({
      movieId: this.$id() || extJson.id, genreId,
    }));
    Object.assign(extJson, { genres });
    return super.$parseJson(extJson, opt);
  }

  static get relationMappings() {
    return {
      genres: {
        relation: Model.HasManyRelation,
        // The related model. This can be either a Model subclass constructor or an
        // absolute file path to a module that exports one. We use the file path version
        // here to prevent require loops.
        modelClass: path.join(__dirname, 'Genre'),
        join: {
          from: 'Movie.id',
          to: 'Genre.movieId',
        },
      },
    };
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['id', 'overview', 'release_date', 'poster_path', 'title', 'vote_average'],

      properties: {
        id: { type: 'integer' },
        overview: { type: 'text' },
        release_date: { type: 'string' },
        poster_path: { type: 'string' },
        title: { type: 'string' },
        vote_average: { type: 'number' },
        rating: { type: ['integer', 'null'], minimum: 0, maximum: 5 },
      },
    };
  }
}

module.exports = Movie;
