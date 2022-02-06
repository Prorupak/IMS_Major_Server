import mongoose from 'mongoose';
import validator from 'validator';
import bcrypt from 'bcryptjs'
import { role } from '../config/rolesConfig.js';
import toJSON from './plugins/toJSON.js';

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: [true, { reqName: 'Name is required' }],
      maxlength: 32,
      validate(value) {
        if (value.length < 3) {
          throw new Error('Name must be at least 3 characters long');
        }
        if (!validator.isAlpha(value)) {
          throw new Error('Name must contain only letters');
        }
        if (validator.isEmpty(value)) {
          throw new Error('Name must not be empty');
        }
      },
    },

    email: {
      type: String,
      trim: true,
      required: true,
      unique: true,
      lowercase: true,
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error('Invalid Email');
        }
      },
      maxlength: 32,
    },

    password: {
      type: String,
      required: true,
      minlength: 8,
      validate(value) {
        if (!value.match(/\d/) || !value.match(/[a-zA-Z]/)) {
          throw new Error('Password must contain at least one letter and one number');
        }
        if (value.length < 8) {
          throw new Error('Password must be at least 8 characters');
        }
      },
    },

    about: {
      type: String,
      trim: true,
    },

    role: {
      type: String,
      enum: role,
      default: 'admin',
      validate(value) {
        if (!role.includes(value)) {
          throw new Error('Invalid role');
        }
      },
    },

    history: {
      type: Array,
      default: [],
    },

    isEmailVerified: {
      type: Boolean,
      default: false,
    },

    // is_Admin: {
    //   type: Boolean,
    //   default: true,
    // },
  },
  {
    timestamps: true,
  },
);

UserSchema.plugin(toJSON);

// check if email is taken
UserSchema.statics.isEmailTaken = async function (email, excludeId) {
  const user = await this.findOne({ email, _id: { $ne: excludeId } });
  return !!user;
};

// check if password is match or not
UserSchema.methods.isPasswordMatch = async function (password) {
  const user = this;
  return bcrypt.compare(password, user.password);
};

UserSchema.pre('save', async function (next) {
  const user = this;
  if (user.isModified('password')) {
    user.password = await bcrypt.hash(user.password, 8);
  }
  next();
});

// virtual

const User = mongoose.model('User', UserSchema);

export default User;
