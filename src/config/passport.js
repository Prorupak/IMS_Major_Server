/* eslint-disable camelcase */
const { Strategy: JwtStrategy, ExtractJwt } = require('passport-jwt');
const config = require('./config');
const { tokenTypes } = require('./tokenTypes');
const User = require('../models/user.models');

const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = 'hello';

const jwtOptions = {
  secretOrKey: config.jwt.secret,
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
};

// eslint-disable-next-line consistent-return
const jwtVerify = async (payload, done) => {
  try {
    if (payload.type !== tokenTypes.ACCESS) {
      throw new Error('invalid token type');
    }
    const user = await User.findById(payload.sub);
    if (!user) {
      return done(null, false);
    }
  } catch (errs) {
    done(errs, false);
  }
};

const jwtStrategy = new JwtStrategy(jwtOptions, jwtVerify);
console.log(jwtOptions.secretOrKey);

export default {
  jwtStrategy,
};

// const { JwtStrategy } = require('passport-jwt').Strategy;
// const { ExtractJwt } = require('passport-jwt').ExtractJwt;
// const passport = require('passport');
// const User = require('../models/user.models');

// const opts = {};
// opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
// opts.secretOrKey = 'secret';
// opts.issuer = 'accounts.examplesoft.com';
// opts.audience = 'yoursite.net';
// passport.use(new JwtStrategy(opts, ((jwt_payload, done) => {
//   User.findOne({ id: jwt_payload.sub }, (err, user) => {
//     if (err) {
//       return done(err, false);
//     }
//     if (user) {
//       return done(null, user);
//     }
//     return done(null, false);
//     // or you could create a new account
//   });
// })));
