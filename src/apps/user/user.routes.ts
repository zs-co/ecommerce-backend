import { Router } from 'express';
import { userController } from './user.controller.js';

const router = Router();

router.get('/', userController.list);
router.get('/:id', userController.get);
router.post('/', userController.post);
router.put('/:id', userController.put);
router.delete('/:id', userController.delete);

export default router;