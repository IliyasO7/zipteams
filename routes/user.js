import { Router } from 'express';
import * as controller from '../controllers/user.js';
import * as validation from '../validation/user.js';
import { validate } from '../utils/helper.js';


const router = Router();

router
  .route('/')
  .get(controller.getUsers)
  .post(validate(validation.createUser), controller.createUser);

router
  .route('/:id')
  .get(controller.getUserById)
  .patch(validate(validation.updateUser), controller.updateUser)
  .delete(controller.deleteUser);


export default router;