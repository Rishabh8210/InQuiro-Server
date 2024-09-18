import { Router } from "express";
import UserController from "../../controllers/user-controller";
const router = Router()
const userController = new UserController();

// User routes
router.get('/', userController.getUserByUsername)
router.get('/:userId', userController.getUserById);
router.delete('/:userId', userController.deleteUserData)
router.patch('/:userId', userController.updateUserData)
export default router