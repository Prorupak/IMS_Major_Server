import httpStatus from 'http-status';
import ApiError from '../utils/ApiError.js';
import catchAsync from '../utils/catchAsync.js';
import {commentsService} from '../services/index.js';

const createComments = catchAsync(async (req, res) => {
   const success = 'Comments successfully Added';
  const comment = await commentsService.createComments( req.body);
  res.status(httpStatus.CREATED).json(comment);
});

const getAllComments = catchAsync(async (req, res) => {
  const { comments } = req.body;
  const comment = await commentsService.getComments(comments, req.body);
  res.json(comment);
});

const getCommentsById = catchAsync(async (req, res) => {
  const { id } = req.params;
  console.log("catId", id);
  const comment = await commentsService.getCommentsById(id);
  console.log(comment);
  if (!comment) {
    throw new ApiError(httpStatus.NOT_FOUND, ['Comments not listed']);
  }
  res.json(comment);
});



const deleteCategoryById = catchAsync(async (req, res) => {
  const { id } = req.params;
  await commentsService.deleteComments(id);
  res.status(httpStatus.NO_CONTENT).json();
});

export default {
  createComments,
  getAllComments,
  getCommentsById,
  deleteCategoryById,
};
