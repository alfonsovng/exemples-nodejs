let JwtStrategy = require('passport-jwt').Strategy;
let ExtractJwt = require('passport-jwt').ExtractJwt;
let User = require('../models/User');
let config = require('.');

// Setup work and export for the JWT passport strategy
module.exports = function(passport) {
  let opts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme("jwt"),
    secretOrKey: config.auth.secret
  };

  passport.use(new JwtStrategy(opts, async (jwt_payload, done) => {
    const user = await User.findOne({id: jwt_payload.id});
    if (user && user.jwt_version === jwt_payload.jwt_version) {
      done(null, user);
    } else {
      done(null, false);
    }
  }));
};
