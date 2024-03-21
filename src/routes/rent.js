import { Router } from 'express';

import * as rentController from '../controllers/rentController.js';
import { Auth } from '../middlewares/auth.js';

const rentRouter = Router();

rentRouter.route('/').post(Auth, rentController.create);

rentRouter.route('/').get(Auth, rentController.getAll);

rentRouter.route('/:id').get(Auth, rentController.getOne);

rentRouter.route('/:id').put(Auth, rentController.updateOne);

rentRouter.route('/:id').delete(Auth, rentController.deleteOne);

export default rentRouter;
