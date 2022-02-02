import  mongoose  from 'mongoose';
import validator from 'validator';
import toJSON from '../plugins/toJSON.ks';

const BrandsSchema = new mongoose.Schema({
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
});

BrandsSchema.plugin(toJSON);

BrandsSchema.statics.findByName = async function (name, excludeId) {
  const brand = await this.findOne({ name, _id: { $ne: excludeId } });
  return !!brand;
};

const Brands = mongoose.model('Brands', BrandsSchema);

export default Brands;
