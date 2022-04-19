import mongoose from 'mongoose';
import validator from 'validator';
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

const customerSchema = new mongoose.Schema({
     customerType: {
           type: String,
           default: 'Individual',
     },
     
     primaryContact: [{
          salutation: {
               type: String,
               trim: true,
          },
          firstName: {
               type: String,
               trim: true,
          },
          lastName: {
               type: String,
               trim: true,
          },
     }],

    company: {
         type: String
    },

     customerDisplayName: {
          type: String,
          trim: true,
          required: true,
     },
     
     email: {
          type: String,
          trim: true,
     },

     phone: {
          type: String,
          trim: true,
     },
     
     website: {
          type: String,
          trim: true,
     },

     paymentTerms: {
          type: String,
          default: "Due 30",
          trim: true,
     },

     otherDetails: [{
          currency: {
               type: String,
               trim: true,
               default: 'NPR',
          },
          taxRate: {
               type: String,
               trim: true,
               default: '0',
          },
          paymentTerms: {
               type: String,
               trim: true,
               default: 'Net 30',
          },
          twitter: {
               type: String,
               trim: true,
          },
          facebook: {
               type: String,
               trim: true,
          },
     }],
     address: [{
          billingAddress: [{
               attention: {
                    type: String,
                    trim: true,
               },
               country: {
                    type: String,
                    trim: true,
                    default: 'Nepal',
               },
               addressLine1: {
                    type: String,
                    trim: true,
               },
               addressLine2: {
                    type: String,
                    trim: true,
               },
               city: {
                    type: String,
                    trim: true,
               },
               state: {
                    type: String,
                    trim: true,
               },
               zip: {
                    type: String,
                    trim: true,
               },
               phone: {
                    type: Number,
               }
          }],
          shippingAddress: [{
                attention: {
                    type: String,
                    trim: true,
               },
               country: {
                    type: String,
                    trim: true,
                    default: 'Nepal',
               },
               addressLine1: {
                    type: String,
                    trim: true,
               },
               addressLine2: {
                    type: String,
                    trim: true,
               },
               city: {
                    type: String,
                    trim: true,
               },
               state: {
                    type: String,
                    trim: true,
               },
               zip: {
                    type: String,
                    trim: true,
               },
               phone: {
                    type: Number,
               },
     }]
     }],
     date: {
          type: String,
          default: formattedDate,
          validate(value) {
               if (value > Date.now()) {
                    throw new Error('Date cannot be in the future');
               }
          }
     },

     comments: [{
          comment: {
               type: String,
               trim: true,
          },
          createdAt: {
               type: String,
               default: moment().format('MMMM Do YYYY, h:mm:ss a'),
          },
          createdBy: {
               type: String,
               trim: true,
          },
     }]
},
  {
    timestamps: {
    },

});

customerSchema.plugin(toJSON);

customerSchema.statics.findByName = async function (name, excludeId) {
  const customer = await this.findOne({ name, _id: { $ne: excludeId } });
  console.log(customer);
  return !!customer;
};

const Customers = mongoose.model('customers', customerSchema);

export default Customers;
