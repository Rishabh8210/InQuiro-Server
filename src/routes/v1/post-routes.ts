import { Router } from "express";
import PostController from "../../controllers/post-controller";
import UserController from "../../controllers/user-controller";
import AnswerController from "../../controllers/answer-controller";
const router = Router();
const postController = new PostController()
const userController = new UserController();
const answerController = new AnswerController()

router.post('/', postController.createPost);
router.post('/like', userController.likePost)
router.post('answer', answerController.createAnswer);
router.put('answer/:postId', answerController.updateAnswer);
router.delete('asnwer/:postId', answerController.deleteAnswer)

export default router