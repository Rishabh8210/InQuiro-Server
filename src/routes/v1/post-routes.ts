import { Router } from "express";
import PostController from "../../controllers/post-controller";
import UserController from "../../controllers/user-controller";
import AnswerController from "../../controllers/answer-controller";
import v1AnswerRoutes from './answer-routes'
const router = Router();
const postController = new PostController()
const userController = new UserController();
const answerController = new AnswerController()

router.use('/answer', v1AnswerRoutes);
router.post('/', postController.createPost);
router.post('/like', userController.likePost)
router.get('/:id/answers', answerController.getAllPostAnswer);

export default router