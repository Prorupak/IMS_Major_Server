/* eslint-disable camelcase */
import {Strategy as JwtStrategy, ExtractJwt} from 'passport-jwt';
import config from './config.js';
import tokenTypes from './tokenTypes.js';
import User from '../models/user.models.js';

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

export default jwtStrategy;