const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const session = require('express-session');
const passport = require('passport')
const path = require('path');
const db = require('../db/index.js');
const PORT = process.env.PORT || 3000
const SequelizeStore = require('connect-session-sequelize')(session.Store)
const sessionStore = new SequelizeStore({db})
if (process.env.NODE_ENV !== 'production'){require('../secrets')}
const toSyncOrNot = process.env.NODE_ENV !== 'production' ? {force: true} : ''

// passport registration
passport.serializeUser((user, done) => done(null, user.id))
passport.deserializeUser((id, done) => db.models.user.findById(id)
  .then(user => done(null, user))
  .catch(done))

// function to wrap middleware:
const createApp = () => {

  // for server logs to help debugging
  app.use(morgan('dev'));

  // static middleware
  app.use(express.static(path.resolve(__dirname, '../public')))

  // requests contain a body. If you want to use it in req.body, you will need some body parsing middleware
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({extended: true}))

  // session middleware with passport
  app.use(session({
    secret: process.env.SESSION_SECRET || 'super secret',
    store: sessionStore,
    resave: false,
    saveUninitialized: false
  }))
  app.use(passport.initialize())
  app.use(passport.session())

  // auth route
  // app.use('/auth', require('./auth'))

  // establish api routes
  app.use('/api', require('./api'));

  // didn't match route. Send back index.html
  app.get('*', function (req, res) {
    res.sendFile(path.resolve(__dirname, '../index.html'));
  });

  // didn't find what you were looking for?
  app.use(function(req, res, next){
    const err = new Error('Not found!');
    err.status = 404;
    next(err);
  })

  // last resort
  app.use(function (err, req, res, next) {
    console.error(err);
    console.error(err.stack);
    res.status(err.status || 500).send(err.message || 'Internal server error.');
  });

}

// function wrapper around server listen:

const startListening = () => {
  app.listen(PORT, function(){
    console.log('Listening on port 3000!')
  })
}

const syncDb = () => db.sync(toSyncOrNot)


// require.main evaluates true when run from command line ('node server/index.js')
// require.main evaluates false when it is required by another module
if (require.main === module) {
  sessionStore.sync()
    .then(syncDb)
    .then(createApp)
    .then(startListening)
} else {
  createApp()
}
