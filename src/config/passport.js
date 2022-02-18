/* eslint-disable camelcase */
import {Strategy as JwtStrategy, ExtractJwt} from 'passport-jwt';
import config from './config.js';
import tokenTypes from './tokenTypes.js';
import { Admin } from '../models/index.js';

const opts = {};

opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = config.jwt.secret;

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
    const admin = await Admin.findById(payload.sub);
    console.log('admin====', admin);
    if (!admin) {
      return done(null, false);
    }
  } catch (errs) {
    done(errs, false);
  }
};

const jwtStrategy = new JwtStrategy(jwtOptions, jwtVerify);

export default jwtStrategy;