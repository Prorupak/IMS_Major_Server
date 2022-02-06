import mongoose from 'mongoose';
import {config} from '../config/index.js';

mongoose.connect(config.mongoose.url, (err) => {
  if (err) {
    console.log('error >>>', err);
  } else {
    console.log('Connected to Database.....');
  }
});
