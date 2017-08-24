const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const session = require('express-session');
const passport = require('passport')
const FacebookStrategy = require('passport-facebook');
const GoogleStrategy = require('passport-google-oauth20');
const { facebook, google } = require('../secrets');
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

// Transform Facebook profile because Facebook and Google profile objects look different
// and we want to transform them into user objects that have the same set of attributes
const transformFacebookProfile = (profile) => ({
  name: profile.name,
  avatar: profile.picture.data.url,
});

// Transform Google profile into user object
const transformGoogleProfile = (profile) => ({
  name: profile.displayName,
  avatar: profile.image.url,
});

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


  passport.use(new FacebookStrategy(facebook,
    function(accessToken, refreshToken, profile, done){
      return done(null, transformFacebookProfile(profile._json))
    }
  ))

  passport.use(new GoogleStrategy(google,
    function(accessToken, refreshToken, profile, done){
      return done(null, transformGoogleProfile(profile._json))
    }
  ))

  // // Register Facebook Passport strategy
  // passport.use(new FacebookStrategy(facebook,
  //   // Gets called when user authorizes access to their profile
  //   async (accessToken, refreshToken, profile, done)
  //  => done(null, transformFacebookProfile(profile._json))
  // ));

  // Register Google Passport strategy
  // passport.use(new GoogleStrategy(google,
  //   async (accessToken, refreshToken, profile, done)
  //   => done(null, transformGoogleProfile(profile._json))
  // ));

  // Serialize user into the sessions
  passport.serializeUser((user, done) => done(null, user));

  // Deserialize user from the sessions
  passport.deserializeUser((user, done) => done(null, user));

  app.use(passport.initialize())
  app.use(passport.session())

  // Set up Facebook auth routes
app.get('/auth/facebook', passport.authenticate('facebook'));

app.get('/auth/facebook/callback',
  passport.authenticate('facebook', { failureRedirect: '/auth/facebook' }),
  // Redirect user back to the mobile app using Linking with a custom protocol OAuthLogin
  (req, res) => res.redirect('OAuthLogin://login?user=' + JSON.stringify(req.user)));

// Set up Google auth routes
app.get('/auth/google', passport.authenticate('google', { scope: ['profile'] }));

app.get('/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/auth/google' }),
  (req, res) => res.redirect('OAuthLogin://login?user=' + JSON.stringify(req.user)));


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
