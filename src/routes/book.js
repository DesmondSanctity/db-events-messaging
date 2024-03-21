import { Router } from 'express';

import * as bookController from '../controllers/bookController.js';
import { Auth } from '../middlewares/auth.js';

const bookRouter = Router();

bookRouter.route('/').post(Auth, bookController.create)

bookRouter.route('/').get(Auth, bookController.getAll);

bookRouter.route('/:id').get(Auth, bookController.getOne);

bookRouter.route('/:id').put(Auth, bookController.updateOne);

bookRouter.route('/:id').delete(Auth, bookController.deleteOne);

export default bookRouter;
