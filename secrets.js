module.exports.facebook = {
  clientID: 'INSERT-CLIENT-ID-HERE',
  clientSecret: 'INSERT-CLIENT-SECRET-HERE',
  callbackURL: 'http://localhost:3000/auth/facebook/callback',
  profileFields: ['id', 'name', 'displayName', 'picture', 'email'],
};

module.exports.google = {
  clientID: 'INSERT-CLIENT-ID-HERE',
  clientSecret: 'INSERT-CLIENT-SECRET-HERE',
  callbackURL: 'http://localhost:3000/auth/google/callback',
};
