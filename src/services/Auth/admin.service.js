/* eslint-disable camelcase */
const User = require('../../models/user.models');

const isAdmin = async (is_Admin) => {
  User.findOne({ is_Admin });
};

export default {
  isAdmin,
};
