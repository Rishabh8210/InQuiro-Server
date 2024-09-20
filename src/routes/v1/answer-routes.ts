import { Router } from 'express'
const router = Router();
import AnswerController from "../../controllers/answer-controller";
const answerController = new AnswerController()

router.get('/post/:postId', answerController.getAllPostAnswer);
router.get('/:userId', answerController.getAllPostAnswer);
export default router;
