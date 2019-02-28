import * as Router from 'koa-router';

import { createValidator } from '../../utils';

import { CreatePersonRequest } from './models';

import {
  getPersons,
  getPersonById,
  createPerson,
  updatePerson,
  deletePerson,
} from './controllers';

export const router = new Router()
  .get('persons/', getPersons)
  .get('persons/:id', getPersonById)
  .put('persons/', createValidator(CreatePersonRequest), createPerson)
  .put('persons/:id', updatePerson)
  .del('persons/:id', deletePerson);
