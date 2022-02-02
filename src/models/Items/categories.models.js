import mongoose from 'mongoose';
import validator from 'validator';
import toJSON from '../plugins/toJSON.js';
import {unitRules} from '../../config/units.js';

const CategorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true,
      maxlength: 32,
      // validate(value) {
      //   if (value.length < 3) {
      //     throw new Error('Name must be at least 3 characters long');
      //   }
      //   if (!validator.isAlpha(value)) {
      //     throw new Error('Name must contain only letters');
      //   }
      //   if (validator.isEmpty(value)) {
      //     throw new Error('Name must not be empty');
      //   }
      // },
    },

    description: {
      type: String,
      trim: true,
    },

    unit: {
      type: String,
      // enum: unitRules.set,
      // default: null,
      // validate(value) {
      //   if (!value) {
      //     return;
      //   }

      //   if (!unitRules.includes(value)) {
      //     throw new Error('Invalid unit');
      //   }
      // },
    },

    date: {
      type: Date,
      default: Date.now,
      validate(value) {
        if (value > Date.now()) {
          throw new Error('Date cannot be in the future');
        }
      },
    },

    multipleItems: [
      {
        attribute: {
          type: String,
          trim: true,
        },
        options: {
          type: String,
          trim: true,
        },
      },
    ],

  },
  {
    timestamps: true,
  },
);

CategorySchema.plugin(toJSON);

CategorySchema.statics.findByName = async function (name, excludeId) {
  const category = await this.findOne({ name, _id: { $ne: excludeId } });
  console.log(category);
  return !!category;
};

const Category = mongoose.model('Category', CategorySchema);

export default Category;
