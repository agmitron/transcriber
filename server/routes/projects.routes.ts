import { Router, Request, Response } from 'express'
import path from 'path'
import { v4 as uuid } from 'uuid'
import transcribers from '../core/transcriber/transcribers'
import { WitAI } from '../core/transcriber/WitAI/WitAI'
import Project from '../models/Project'
import User from '../models/User';
import { uploadMiddleware } from '../storage/Storage'
import { resolveOrCreate } from '../utils/files'
import {
    authMiddleware,
    getJWTfromRequest,
    ProjectUploadData,
} from './helpers'

const router = Router()

// /api/projects
router.get('/', authMiddleware, async (req: Request, res: Response) => {
    try {
        const token = getJWTfromRequest(req)
        const { userID } = token
        const projects = await Project.find({ author: userID })

        return res.status(201).json({ message: 'Projects were successfully returned', projects })
    } catch (e) {
        console.error(`Projects Route error: ${e}`)
        return res.status(500).json({ message: 'Something went wrong, try again' })
    }
})

// /api/projects/123
// /api/projects/13
// /api/projects/1 ...
router.get('/:id', async (req: Request, res: Response) => {
    const { id } = req.params
    try {
        const project = await Project.findById(id)

        return res.status(201).json({ message: 'Project was found', project })
    } catch (e) {
        console.error(`Can't find project with id ${id}. See full error: ${e}`)
        return res.status(500).json({ message: `Can't find project with id ${id}. See full error: ${e}` })
    }
})


// Creates a new project and sends it to recognition
router.post('/', ...[authMiddleware, uploadMiddleware], async (req: Request, res: Response) => {
    try {
        const { userID } = getJWTfromRequest(req)
        const { title, engine_and_lang }: ProjectUploadData = req.body
        const { file } = req

        const [engine, lang] = engine_and_lang.split('_') as [keyof typeof transcribers, string]
        const filePath = path.resolve(resolveOrCreate('storage', 'users', userID), file.filename)

        const transcriber = transcribers[engine]
        const text = await transcriber.transcribe(filePath, lang)

        const author = userID

        const project = new Project({
            title,
            text,
            author,
            lang
        })

        await project.save()

        return res.status(201).json({
            message: 'Project was created',
            result: text
        })
    } catch (e) {
        console.error(`Project Route error: ${e}`)
        return res.status(500).json({ message: `${e}` })
    }
})

export default router