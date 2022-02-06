import User from '../../models/user.models.js';


const isAdmin = async (is_Admin) => {
  User.findOne({ is_Admin });
};

export default {
  isAdmin,
};
