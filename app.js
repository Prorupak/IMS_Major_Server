// const createError = require('http-errors');
import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import httpStatus from 'http-status';
import mongoSanitize from 'express-mongo-sanitize';
import passport from 'passport';
import apiRoutes from './src/routes/api.js';
import ApiError from './src/utils/ApiError.js';
import {error} from './src/middlewares/index.js';
import {logger, config, JwtStrategy } from './src/config/index.js';
// const oldSpawn = childProcess.spawn;


const app = express();

// mongo config
import './src/utils/db_init.js';
import Admin from './src/models/admin.models.js';

// parse json body request
app.use(cors());
app.use(express.json());

// sanitize request data
// app.use(xss());
app.use(mongoSanitize());

// jwt auth
app.use(passport.initialize());
passport.use('jwt', JwtStrategy);
passport.use(Admin.createStrategy());

if (app.get('env') === 'development') {
  app.use(morgan('tiny'));
}


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
app.use(error.errorConverter);

// handle error
app.use(error.errorHandler);

app.listen(config.port, () => {
  logger.info(`Listening to port ${config.port}`);
});

export default app;
