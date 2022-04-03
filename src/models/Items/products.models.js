/* eslint-disable no-restricted-globals */
/* eslint-disable max-len */
import mongoose from 'mongoose';
import validator from 'validator';
import { accountData } from '../../config/index.js';
import units from '../../config/units.js';
import toJSON from '../plugins/toJSON.js';
import moment from 'moment';

function pad2(n) {
  return (n < 10 ? '0' : '') + n;
}

var date = new Date();
var month = pad2(date.getMonth() + 1);//months (0-11)
var day = pad2(date.getDate());//day (1-31)
var year = date.getFullYear();

var formattedDate = year + "/" + month + "/" + day;
const ProductsSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    // required: true,
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

  price: {
    type: Number,
    // required: true,
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
    // required: true,
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

  sku: {
    type: String,
    trim: true,
    maxlength: 32,
    validate(value) {
      if (value.length < 3) {
        throw new Error('SKU must be at least 3 characters long');
      }
    },
  },
  unit: {
    type: String,
    // required: true,
    validate(value) {
      if (value === 'unit') {
        throw new Error('Unit must be a valid unit');
      }
    }
  },

  dimensions: {
    type: String,
  },

  dUnit: {
    type: String,
  },

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

  wUnit: {
    type: String,
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
    type: String,
    default: formattedDate,
    validate(value) {
      if (value > Date.now()) {
        throw new Error('Date cannot be in the future');
      }
    },
  },

  brand: {
   type: String
  },

  manufacturer: {
    type: String
  },
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

  PurchaseInformation: [
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

},
  {
    timestamps: {
      // $gt: new Date(new Date().getTime() - 24 * 60 * 60 * 1000),
    },
});

ProductsSchema.plugin(toJSON);

ProductsSchema.statics.findByName = async function (name, excludeId) {
  const product = await this.findOne({ name, _id: { $ne: excludeId } });
  console.log(product);
  return !!product;
};

const Products = mongoose.model('products', ProductsSchema);

export default Products;
