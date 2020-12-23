require('dotenv').config();

const { POSTGRES_HOST, POSTGRES_USER, POSTGRES_PASSWORD, POSTGRES_NAME } = process.env;
module.exports = {
  "development": {
    "username": POSTGRES_USER,
    "password": POSTGRES_PASSWORD,
    "database": POSTGRES_NAME,
    "host": POSTGRES_HOST,
    "dialect": "postgres"
  },
  "test": {
    "username": POSTGRES_USER,
    "password": POSTGRES_PASSWORD,
    "database": POSTGRES_NAME,
    "host": POSTGRES_HOST,
    "dialect": "postgres"
  },
  "production": {
    "username": POSTGRES_USER,
    "password": POSTGRES_PASSWORD,
    "database": POSTGRES_NAME,
    "host": POSTGRES_HOST,
    "dialect": "postgres"
  }
}
