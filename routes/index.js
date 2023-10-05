import Router from 'express';
import userRoutes from './user.js';
import todoRoutes from './todo.js';
import { sendResponse } from '../utils/helper.js';
const router = Router();

router.use('/users', userRoutes);
router.use('/todos',todoRoutes);


router.use((req, res) => {
  sendResponse(res, 404, 'Route Not Found', null, { path: req.path });
});

export default router;