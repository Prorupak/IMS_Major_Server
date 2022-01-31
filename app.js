// const createError = require('http-errors');
import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import httpStatus from 'http-status';
import mongoSanitize from 'express-mongo-sanitize';
import passport from 'passport';
import apiRoutes from './src/routes/api.js';
import ApiError from './src/utils/ApiError.js';
import {errorConverter, errorHandler} from './src/middlewares/error.js';

const config = require('./src/config/config');
const logger = require('./src/config/logger');
const { jwtStrategy } = require('./src/config/passport');

// const oldSpawn = childProcess.spawn;

const app = express();
// mongo config
require('./src/utils/db_init');

// parse json body request
app.use(cors());
app.use(express.json());

// sanitize request data
// app.use(xss());
app.use(mongoSanitize());

// jwt auth
app.use(passport.initialize());
passport.use('jwt', jwtStrategy);

if (app.get('env') === 'development') {
  app.use(morgan('tiny'));
}

// middleware for parsing application

// // limit repeated failed requests to auth endpoints
// if (config.env === 'production') {
//   app.use('/v1/auth', authLimiter);
// }

// routing lvl middleware
app.use('/api', apiRoutes);

app.use((req, res, next) => {
  next(httpStatus.NOT_FOUND);
});
// send back a 404 error for any unknown api request
app.use((req, res, next) => {
  next(new ApiError(httpStatus.NOT_FOUND, 'Not found'));
});

// convert error to ApiError, if needed
app.use(errorConverter);

// handle error
app.use(errorHandler);

app.listen(config.port, () => {
  logger.info(`Listening to port ${config.port}`);
});

export default app;
