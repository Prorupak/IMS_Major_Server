import dotenv from 'dotenv';
import path from 'path';
import Joi from 'joi';

dotenv.config({ path: path.join(__dirname, '../../.env') });

const envVarsSchema = Joi.object()
  .keys({
    NODE_ENV: Joi.string().valid('production', 'development', 'test').default('development'),
    PORT: Joi.number().default(9001),
    MONGODB_URL: Joi.string().required().description(process.env.MONGODB_URL),
    JWT_SECRET: Joi.string().description(process.env.JWT_SECRET),
    // eslint-disable-next-line max-len
    JWT_ACCESS_EXPIRATION_MINUTES: Joi.number().default(20).description(process.env.JWT_ACCESS_EXPIRATION_MINUTES),
    // eslint-disable-next-line max-len
    JWT_REFRESH_EXPIRATION_DAYS: Joi.number().default(20).description(process.env.JWT_REFRESH_EXPIRATION_DAYS),
  })
  .unknown();

const { value: envVars, error } = envVarsSchema.prefs({ errors: { label: 'key' } }).validate(process.env);

if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

export default {
  env: envVars.NODE_ENV,
  port: envVars.PORT,
  mongoose: {
    url: envVars.MONGODB_URL + (envVars.NODE_ENV === 'test' ? '-test' : ''),
    options: {
      useCreateIndex: true,
      useNewUrlParser: true,
      useUnifiedTopology: true,
    },
  },
  jwt: {
    secret: envVars.JWT_SECRET,
    accessExpirationMinutes: envVars.JWT_ACCESS_EXPIRATION_MINUTES,
    refreshExpirationDays: envVars.JWT_REFRESH_EXPIRATION_DAYS,
  },
};
