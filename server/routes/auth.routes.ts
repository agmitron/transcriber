import { Router, Request, Response } from 'express'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import config from 'config'
import { check, validationResult } from 'express-validator'
import User from '../models/User'
const router = Router()

// /api/auth/register
router.post(
    '/register',
    [
        check('email', 'Incorrect email address').isEmail(),
        check('password', 'Min length of the password should be 6 characters')
            .isLength({ min: 6 })
    ],
    async (req: Request, res: Response) => {
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                return res.status(400).json({
                    errors: errors.array(),
                    message: 'Incorrect data during register'
                })
            }

            const { full_name, login, password, email } = req.body

            const candidate = await User.findOne({ email })

            if (candidate) {
                return res.status(400).json({ message: 'Such user already exists' })
            }


            const hashedPassword = await bcrypt.hash(password, 12)
            const user = new User({
                email, password: hashedPassword, login, full_name
            })

            await user.save()

            return res.status(201).json({ message: 'User was succesfully created' })
        } catch (e) {
            res.status(500).json({ message: e.message })
        }
    }
)

// /api/auth/login
router.post(
    '/login',
    [
        check('email', 'Enter a correct email').normalizeEmail().isEmail(),
        check('password', 'Enter the password').exists()
    ],
    async (req: Request, res: Response) => {
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                return res.status(400).json({
                    errors: errors.array(),
                    message: 'Incorrect data during logging in'
                })
            }

            const { email, password } = req.body


            const user = await User.findOne({ email })

            if (!user) {
                return res.status(400).json({ message: 'Such user wasn\'t found' })
            }

            const isMatch = await bcrypt.compare(password, user.password)

            if (!isMatch) {
                return res.status(400).json({ message: 'Incorrect password' })
            }

            const expiresIn = '2h'

            const token = jwt.sign(
                { userID: user.id },
                config.get('jwtSecret'),
                { expiresIn }
            )

            res.json({ token, userID: user.id, email })

        } catch (e) {
            res.status(500).json({ message: e.message })
        }
    }
)

export default router