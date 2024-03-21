import { Router } from 'express';

import * as userController from '../controllers/userController.js';
import { Auth } from '../middlewares/auth.js';

const userRouter = Router();


userRouter.route('/').get(Auth, userController.getAll);

userRouter.route('/:id').get(Auth, userController.getOne);

userRouter.route('/:id').put(Auth, userController.updateOne);

userRouter.route('/:id').delete(Auth, userController.deleteOne);

export default userRouter;
