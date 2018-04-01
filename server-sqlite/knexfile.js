// To support "production" deployment on basin we have identical development
// and production configurations. More typically production will be PostgreSQL
// or MySQL. Because this configuration is code, you can use environment variables
// e.g. when using Heroku.
module.exports = {
  test: {
    client: 'sqlite3',
    connection: {
      filename: './movies-test.db',
    },
    useNullAsDefault: true,
    seeds: {
      directory: './seeds/test',
    },
  },
  development: {
    client: 'sqlite3',
    connection: {
      filename: './movies.db',
    },
    useNullAsDefault: true,
  },
  production: {
    client: 'sqlite3',
    connection: {
      filename: './movies.db',
    },
    useNullAsDefault: true,
  },
};
