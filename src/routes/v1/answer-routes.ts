import { Router } from 'express'
const router = Router();
import AnswerController from "../../controllers/answer-controller";
const answerController = new AnswerController()

router.post('/', answerController.createAnswer);
router.put('/:postId', answerController.updateAnswer);
router.delete('/:postId', answerController.deleteAnswer)
export default router;
