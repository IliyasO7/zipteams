import { Router } from 'express';
import * as controller from '../controllers/todo.js';
import * as validation from '../validation/todo.js';
import { validate } from '../utils/helper.js';
import { checkAuth } from '../middlewares/checkAuth.js';



const router = Router();


router
  .route('/')
  .get(controller.getTodos)
  .post(validate(validation.createTodo),checkAuth(), controller.createTodo);

router
  .route('/:id')
  .get(controller.getTodoById)
  .patch(validate(validation.updateTodo),checkAuth(), controller.updateTodo)
  .delete(checkAuth(),controller.deleteTodo);

export default router;