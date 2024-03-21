import { Router } from 'express';

import * as authController from '../controllers/authController.js';

const authRouter = Router();


authRouter.route('/signup').post(authController.signup);

authRouter.route('/login').post(authController.login);

authRouter.route('/forgotPassword').post(authController.forgotPassword);

authRouter.route('/resetPassword').post(authController.resetPassword);

authRouter.route('/changePassword').post(authController.changePassword);

export default authRouter;
