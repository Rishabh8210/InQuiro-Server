import {Router} from 'express'
import UserController from '../../controllers/user-controller'
import { signinValidator } from '../../middleware/auth-validator'
import v1UserRoutes from './user-routes'
import v1PostRoutes from './post-routes'
import v1AnswerRoutes from './answer-routes'
const router = Router()
const userController = new UserController();

// Auths routes - [sign-up, sign-in] 
router.post('/signup', userController.createUser);
router.post('/signin', signinValidator, userController.siginUser)

// Users routes
router.use('/users', v1UserRoutes)

// posts routes
router.use('/posts', v1PostRoutes);

// answers routes
router.use('/answers', v1AnswerRoutes);
export default router