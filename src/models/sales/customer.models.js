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
     name: {
           type: String,
               trim: true,
               required: true,
     },
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
