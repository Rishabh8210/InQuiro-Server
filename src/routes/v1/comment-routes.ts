import { Router } from 'express'
import CommentController from "../../controllers/comment-controller";
const commentController = new CommentController();

const router = Router();

router.post('/', commentController.createComment);
router.put('/:commentId', commentController.updateComment);
router.delete('/:commentId', commentController.deleteComment);
router.get('/:postId', commentController.getAllTopLevelComments);

export default router;