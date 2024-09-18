import { Router } from "express";
import PostController from "../../controllers/post-controller";
const router = Router();
const postController = new PostController()

router.post('/', postController.createPost);

export default router