import Joi from 'joi';
import {unitRules} from '../../config/units.js'
import { objectId } from '../custom.validation.js';

export const createCategory = {
  body: Joi.object().keys({
    name: Joi.string(),
    description: Joi.string(),

    unit: Joi.string().valid(unitRules),

    multipleItems: [
      {
        attribute: Joi.string(),
        options: Joi.string(),
      },
    ],
  }),
  date: Joi.date().default(Date.now),
};

export const getCategory = {
  query: Joi.object().keys({
    name: Joi.string().required(),
    description: Joi.string(),
    unit: Joi.string().valid(unitRules),

    multipleItems: [
      {
        attribute: Joi.string(),
        options: Joi.string(),
      },
    ],
  }),
  date: Joi.date().default(Date.now),

};

export const getCategoryById = {
  query: Joi.object().keys(
    {
      id: Joi.string().custom(objectId),
    },
  ),
};

export const updateCategoryById = {
  params: Joi.object().keys(
    {
      id: Joi.string().custom(objectId),
    },
  ),

  body: Joi.object().keys(
    {
      name: Joi.string().required(),
      description: Joi.string(),
      unit: Joi.string().valid(unitRules),
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

export const deleteCategoryById = {
  params: Joi.object().keys(
    {
      id: Joi.string(),
    },
  ),
};

