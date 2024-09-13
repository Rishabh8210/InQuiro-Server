import express, {Request, Response} from 'express'
import User from '../models/User'
const router = express.Router()

interface IUser {
    username: string,
    email: string,
    password: string,
    
}

router.post('/v1/signup', async (req: Request, res: Response) => {
    try {
        console.log(req.body);
        const data = req.body
        const resp = await User.create(data);
        return res.status(200).json({
            data: resp,
            message: 'Created Data',
            err: {}
        })
    } catch (error:any) {
        return res.status(500).json({
            data: {},
            message: 'Created Data',
            err: error
        })
    }
})

export default router