const Sequelize = require('sequelize');


const db = new Sequelize(process.env.DATABASE_URL || 'postgres://localhost:5432/pulse', {
  logging: false
  // other options
});


/*
If you use Heroku as a deployment service, and use the Heroku Postgres plugin for deploying your database, the db url will be made available as an environment variable called DATABASE_URL. The Sequelize initialization above prepares the app for deployment by looking for this variable on process.env, or to just use the hard coded path to your postgres database on your machine.
*/

module.exports = db;
