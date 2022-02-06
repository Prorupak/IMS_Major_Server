/* eslint-disable no-restricted-globals */
/* eslint-disable max-len */
import mongoose from 'mongoose';
import validator from 'validator';
import {accountData, units} from '../../config/index.js';
import toJSON from '../plugins/toJSON.js';

const ProductsSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: true,
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

  price: {
    type: Number,
    required: true,
    validate(value) {
      if (value <= 1) {
        throw new Error('Price must be greater than 0');
      }

      if (isNaN(value)) {
        throw new Error('Price must be a number');
      }
    },
  },

  description: {
    type: String,
    trim: true,
  },

  quantity: {
    type: Number,
    required: true,
    validate(value) {
      if (value <= 0) {
        throw new Error('Quantity must be greater than 0');
      }

      if (isNaN(value)) {
        throw new Error('Quantity must be a number');
      }

      if (value % 1 !== 0) {
        throw new Error('Quantity must be an integer');
      }
    },
  },

  dimensions: [
    {
      length: {
        type: Number,
      },
      width: {
        type: Number,
      },
      height: {
        type: Number,
      },
    },
    {
      unit: {
        type: String,
        enum:units.unitRules.set,
      },
    },
  ],

  weight: {
    type: Number,
    trim: true,
    validate(value) {
      if (value <= 0) {
        throw new Error('Weight must be greater than 0');
      }

      if (isNaN(value)) {
        throw new Error('Weight must be a number');
      }

      if (value % 1 !== 0) {
        throw new Error('Weight must be an integer');
      }
    },
  },

  image: {
    type: String,
    validate(value) {
      if (!validator.isURL(value)) {
        throw new Error('Image URL is invalid');
      }

      if (!validator.isLength(value, { min: 5, max: 2000 })) {
        throw new Error('Image URL is too long');
      }
      // should be jpeg, jpg
      if (!value.match(/\.(jpeg|jpg)$/)) {
        throw new Error('Image URL must be a jpeg or jpg');
      }
    },
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

  // brand: {
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: 'Brands',
  //   required: true,
  //   validate(values) {
  //     if (values.name > 3) {
  //       throw new Error('Brands must be least 3 letters');
  //     }
  //   },
  // },

  isbn: {
    type: String,
    trim: true,
    validate(value) {
      if (!validator.isISBN(value)) {
        throw new Error('ISBN is invalid');
      }
    },
  },

  SalesInformation: [
    {
      sellingPrice: {
        type: Number,
        required: true,
        validate(value) {
          if (value <= 0) {
            throw new Error('Selling price must be greater than 0');
          }

          if (isNaN(value)) {
            throw new Error('Selling price must be a number');
          }
        },
      },

      account: {
        type: String,
        enum: accountData.accountItems.set,
        default: 'Income',
        required: true,
      },

      description: {
        type: String,
        trim: true,
      },

      tax: {
        type: Number,
        validate(value) {
          if (value < 0) {
            throw new Error('Tax must be greater than 0');
          }

          if (isNaN(value)) {
            throw new Error('Tax must be a number');
          }
        },
      },
    },
  ],

  purchaseInformation: [
    {
      costPrice: {
        type: Number,
        required: true,
        validate(value) {
          if (value <= 0) {
            throw new Error('Cost price must be greater than 0');
          }

          if (isNaN(value)) {
            throw new Error('Cost price must be a number');
          }
        },
      },

      account: {
        type: String,
        enum: accountData.purchaseItems.set,
        required: true,
      },

      description: {
        type: String,
        trim: true,
      },

      tax: {
        type: Number,
        validate(value) {
          if (value < 0) {
            throw new Error('Tax must be greater than 0');
          }

          if (isNaN(value)) {
            throw new Error('Tax must be a number');
          }
        },
      },
    },
  ],

});

ProductsSchema.plugin(toJSON);

ProductsSchema.statics.findByName = async function (name, excludeId) {
  const product = await this.findOne({ name, _id: { $ne: excludeId } });
  console.log(product);
  return !!product;
};

const Products = mongoose.model('Products', ProductsSchema);

export default Products;
