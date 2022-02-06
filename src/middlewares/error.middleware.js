
import  Mongoose  from 'mongoose';
import httpStatus from 'http-status';
import {logger, config} from '../config/index.js';
import ApiError from '../utils/ApiError.js';

  const errorConverter = (err, req, res, next) => {
  let error = err;
  if (!(error instanceof ApiError)) {
    // eslint-disable-next-line max-len
    const statusCode = error.statusCode || error instanceof Mongoose.Error ? httpStatus.BAD_REQUEST : httpStatus.INTERNAL_SERVER_ERROR;
    const message = error.message || httpStatus[statusCode];
    error = new ApiError(statusCode, message, false, err.stack);
  }
  next(error);
};

/**
 * Get unique error field name
 */
  const uniqueMessage = (error) => {
  let output;
  try {
    const fieldName = error.message.substring(
      error.message.lastIndexOf('.$') + 2,
      error.message.lastIndexOf('_1'),
    );
    output = `${fieldName.charAt(0).toUpperCase()
            + fieldName.slice(1)
    } already exists`;
  } catch (ex) {
    output = 'Unique field already exists';
  }

  return output;
};

/**
 * Get the erroror message from error object
 */
  const dbErrorHandler = (error) => {
  let message = '';

  if (error.code) {
    switch (error.code) {
      case 11000:
      case 11001:
        message = uniqueMessage(error);
        break;
      default:
        message = 'Something went wrong';
    }
  } else {
    // eslint-disable-next-line no-restricted-syntax
    for (const errorName in error.errorors) {
      if (error.errorors[errorName].message) { message = error.errorors[errorName].message; }
    }
  }

  return message;
};

// eslint-disable-next-line no-unused-vars
  const errorHandler = (err, req, res, next) => {
  let { statusCode, message } = err;
  if (config.env === 'production' && !err.isOperational) {
    statusCode = httpStatus.INTERNAL_SERVER_ERROR;
    message = httpStatus[httpStatus.INTERNAL_SERVER_ERROR];
  }

  res.locals.errorMessage = err.message;

  const response = {
    code: statusCode,
    message,
    ...(config.env === 'development' && { stack: err.stack }),
  };

  if (config.env === 'development') {
    logger.error(err);
  }

  res.status(statusCode).send(response);
};

export default {
  errorConverter,
  dbErrorHandler,
  errorHandler,
}