import { Router, Response, Request } from 'express'
import User from '../models/User'
import bcrypt from 'bcryptjs'
import { check, validationResult } from 'express-validator'
import { authMiddleware, getJWTfromRequest, TOKEN_PROPERTY } from './helpers'

const router = Router()

router.get('/', authMiddleware, async (req: Request, res: Response) => {
    try {
        const { userID } = getJWTfromRequest(req)
        const user = await User.findById(userID)

        return res.status(200).send({
            message: 'User was found.',
            result: user
        })
    } catch (e) {
        return res.status(500).send({
            message: e.message
        })
    }
})

router.put('/', authMiddleware, async (req: Request, res: Response) => {
    try {
        const { userID } = getJWTfromRequest(req)
        const password = req.body.password
            ? await bcrypt.hash(req.body.password, 12)
            : null

        const user = await User.findByIdAndUpdate(
            userID,
            {
                ...req.body,
                ...(password ? { password } : {})
            },
            {
                new: true
            }
        )

        if (!user) {
            return res.status(404).send({
                message: 'Such user wasn\'t found'
            })
        }

        return res.status(200).send({
            message: 'Profile was updated.',
            result: user.toObject()
        })
    } catch (e) {
        return res.status(500).send({
            message: e.message
        })
    }
})

export default router