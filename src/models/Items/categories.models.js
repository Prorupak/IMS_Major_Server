import mongoose from 'mongoose';
import validator from 'validator';
import toJSON from '../plugins/toJSON.js';
import {units} from '../../config/index.js';
function pad2(n) {
  return (n < 10 ? '0' : '') + n;
}

var date = new Date();
var month = pad2(date.getMonth() + 1);//months (0-11)
var day = pad2(date.getDate());//day (1-31)
var year = date.getFullYear();

export const formattedDate = year + "/" + month + "/" + day;

const CategorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true,
      maxlength: 32,
      validate(value) {
        if (value.length < 3) {
          throw new Error('Name must be at least 3 characters long');
        }
        if (validator.isEmpty(value)) {
          throw new Error('Name must not be empty');
        }
      },
    },

    description: {
      type: String,
      trim: true,
    },


    date: {
      type: Date,
      default: formattedDate,

      validate(value) {
        if (value > Date.now()) {
          throw new Error('Date cannot be in the future');
        }
      },
    },

    products: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'products',
    }],

    brand: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'brand',
    }],

    manufacturer: [{
      type: String,
    }],

    tax: [{
      type: String
    }],

    multipleItems: [
      {
        attribute: {
          type: String,
          trim: true,
        },
        options: [{
          type: String,
          trim: true,
        }],
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

const Category = mongoose.model('category', CategorySchema);

export default Category;
