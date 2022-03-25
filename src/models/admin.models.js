import mongoose from 'mongoose';
import validator from 'validator';
import passportLocalMongoose from 'passport-local-mongoose';
import bcrypt from 'bcryptjs'
import { role } from '../config/rolesConfig.js';
import toJSON from './plugins/toJSON.js';

const adminSchema = new mongoose.Schema(
     {
          name: {
               type: String,
               trim: true,
               required: [true, 'Name is required'],
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
               }
          },
          email: {
               type: String,
               trim: true,
               required: [true, 'Email is required'],
               unique: [true, 'Email already exists'],
               lowercase: true,
               validate(value) {
                    if (!validator.isEmail(value)) {
                         throw new Error('Invalid Email');
                    }
               }
          },
          password: {
               type: String,
               required: [true, 'Password is required'],
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

          phone: {
               type: String,
               trim: true,
               required: true,
          },

          countries: {
               type: String,
               trim: true,
               required: true,
          },

          is_Admin: {
               type: Boolean,
               default: true,
          },
     },
     {
          timestamps: true,
     }
);



adminSchema.plugin(toJSON);
adminSchema.plugin(passportLocalMongoose, {
     usernameField: 'email',
     passwordField: 'password',
     session: false,
     limitAttempts: true,
     maxAttempts: 5,
     interval: 60 * 60 * 1000,
     errorMessages: {
          IncorrectPasswordError: 'Incorrect Password',
          UserNotFoundError: 'User not found',
          TooManyAttemptsError: 'Too many attempts',
     },
});

adminSchema.statics.isEmailTaken = async function (email, excludeId) {
     const admin = await this.findOne({ email, _id: { $ne: excludeId } });
     return !!admin;
};

adminSchema.statics.isPasswordMatch = async function (password) {
     const admin = this;
     return bcrypt.compare(password, admin.password);
};


adminSchema.pre('save', async function (next) {
     const admin = this;
     if (admin.isModified('password')) {
          admin.password = await bcrypt.hash(admin.password, 8);
     }
     next();
});

const Admin = mongoose.model('Admin', adminSchema);

export default Admin;