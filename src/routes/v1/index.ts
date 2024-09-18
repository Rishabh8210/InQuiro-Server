import {Router} from 'express'
import UserController from '../../controllers/user-controller'
import { signinValidator } from '../../middleware/auth-validator'
import v1UserRoutes from './user-routes'
const router = Router()
const userController = new UserController();

// Auth sign-up, sign-in route
router.post('/signup', userController.createUser);
router.post('/signin', signinValidator, userController.siginUser)
router.use('/users', v1UserRoutes)
export default router