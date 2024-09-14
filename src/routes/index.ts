import express from "express";
const router = express.Router();
import {createUser} from '../controllers/user-controller'

router.post('/v1/signup', createUser)

export default router