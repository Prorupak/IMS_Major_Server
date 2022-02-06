import Joi from 'joi';
import {units} from '../../config/index.js';
import { objectId } from '../custom.validation.js';

 const createCategory = {
  body: Joi.object().keys({
    name: Joi.string(),
    description: Joi.string(),

    unit: Joi.string().valid(units.unitRules),

    multipleItems: [
      {
        attribute: Joi.string(),
        options: Joi.string(),
      },
    ],
  }),
  date: Joi.date().default(Date.now),
};

 const getCategory = {
  query: Joi.object().keys({
    name: Joi.string().required(),
    description: Joi.string(),
    unit: Joi.string().valid(units.unitRules),

    multipleItems: [
      {
        attribute: Joi.string(),
        options: Joi.string(),
      },
    ],
  }),
  date: Joi.date().default(Date.now),

};

 const getCategoryById = {
  query: Joi.object().keys(
    {
      id: Joi.string().custom(objectId),
    },
  ),
};

 const updateCategoryById = {
  params: Joi.object().keys(
    {
      id: Joi.string().custom(objectId),
    },
  ),

  body: Joi.object().keys(
    {
      name: Joi.string().required(),
      description: Joi.string(),
      unit: Joi.string().valid(units.unitRules),
      multipleItems: [
        {
          attribute: Joi.string(),
          options: Joi.string(),
        },
      ],
      date: Joi.date().default(Date.now),
    },
  )
    .min(1),
};

 const deleteCategoryById = {
  params: Joi.object().keys(
    {
      id: Joi.string(),
    },
  ),
};

export default {
  createCategory,
  getCategory,
  getCategoryById,
  updateCategoryById,
  deleteCategoryById,
};
