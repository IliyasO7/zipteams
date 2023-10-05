import { Router } from 'express';
import * as controller from '../controllers/user.js';
import * as validation from '../validation/user.js';
import { validate,verifyApiKey } from '../utils/helper.js';
import { checkAuth } from '../middlewares/checkAuth.js';

const router = Router();

router
  .route('/')
  .get(controller.getUsers)
  .post(verifyApiKey,validate(validation.createUser), controller.createUser);

router
  .route('/login')
  .post(validate(validation.login), controller.login);

router
  .route('/:id')
  .get(controller.getUserById)
  .patch(validate(validation.updateUser),checkAuth(), controller.updateUser)
  .delete(verifyApiKey,controller.deleteUser);


export default router;