const { Model } = require('objection');

class Rating extends Model {
  // Table name is the only required property.
  static get tableName() {
    return 'Rating';
  }

  // Indicate our composite primary key (instead of id)
  static get idColumn() {
    return ['userId', 'movieId'];
  }
}

module.exports = Rating;
