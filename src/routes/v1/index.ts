import {Router} from 'express'
import UserController from '../../controllers/user-controller'
import { signinValidator } from '../../middleware/auth-validator'
const router = Router()
const userController = new UserController();

// Auth sign-up, sign-in route
router.post('/signup', userController.createUser);
router.post('/signin', signinValidator, userController.siginUser)

export default router