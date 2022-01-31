const mongoose = require('mongoose');
const config = require('../config/config');

mongoose.connect(config.mongoose.url, (err) => {
  if (err) {
    console.log('error >>>', err);
  } else {
    console.log('Connected to Database.....');
  }
});
