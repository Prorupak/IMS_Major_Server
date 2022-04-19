import httpStatus from 'http-status';
import { Customer, Comments} from '../models/index.js';
import ApiError from '../utils/ApiError.js';

const createComments = async (commentsBody) => {
  return Comments.create(commentsBody);
};

const getComments = async (comment) => {
  const customer = await Comments.find({ comment })
  return customer;
};

const getCommentsById = async (id) => {
  const customer = await Comments.findById(id);
  return customer;
};

const deleteComments = async (id) => {
  const customer = await getCommentsById(id);

  if (!customer) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Comments not listed');
  }

  await customer.remove();

  return customer;
};

export default {
  createComments,
  getComments,
  getCommentsById,
  deleteComments,
};
