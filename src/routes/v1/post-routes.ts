import { Router } from "express";
import PostController from "../../controllers/post-controller";
import UserController from "../../controllers/user-controller";
const router = Router();
const postController = new PostController()
const userController = new UserController();

router.post('/', postController.createPost);
router.post('/like', userController.likePost)
export default router