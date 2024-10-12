import { Router } from 'express';
import { UserController } from '../controllers/UserController';

const router = Router();
const userController = new UserController();

router.get('/users', userController.getAllUsers);
router.get('/users/:username', userController.getUser);
router.post('/users', userController.createUser);
router.delete('/users/:username', userController.deleteUser);
router.post('/users/login', userController.login.bind(userController));

export default router;
