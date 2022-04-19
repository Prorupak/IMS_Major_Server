import mongoose from 'mongoose';
import validator from 'validator';
import toJSON from './plugins/toJSON.js';
import moment from 'moment';

const commentsSchema = new mongoose.Schema({   
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

commentsSchema.plugin(toJSON);

// commentsSchema.statics.findByName = async function (name, excludeId) {
//   const comment = await this.findOne({ name, _id: { $ne: excludeId } });
//   console.log(comment);
//   return !!comment;
// };

const Comments = mongoose.model('comments', commentsSchema);

export default Comments;
