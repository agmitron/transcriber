import { Router, Request, Response } from 'express';
import { Types } from 'mongoose';
import path from 'path';
import { WitAI } from '../core/transcriber/WitAI/WitAI';
import YandexASR from '../core/transcriber/Yandex/YandexASR';
import Project from '../models/Project';
import { uploadMiddleware } from '../storage/Storage';
import { ProjectUploadData } from './helpers';

const router = Router()

// /api/projects
router.get('/', async (req: Request, res: Response) => {
    try {
        // TODO: security
        const projects = await Project.find()
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
router.post('/', uploadMiddleware, async (req: Request, res: Response) => {
    try {
        const { title, email, lang, type }: ProjectUploadData = req.body
        const { file } = req

        if (!email) {
            return res.status(403).json({ 
                message: `Can't get user's email. Check correctness of your authentication and try again.` 
            })
        }

        const filePath = path.resolve('storage', 'users', email, file.filename)
        let text = ''

        if (!type || type === 'wit') {
            text = await WitAI.transcribe(filePath, lang)
        }
        // } else {
        //     await YandexASR.loadFileToBucket(filePath, file)
        //     text = await YandexASR.transcribe(filePath, lang)
        // }
        
        const project = new Project({
            title,
            text,
            email,
            lang
        })
        
        await project.save()

        return res.status(201).json({ message: 'Project was created', result: text })
    } catch (e) {
        console.error(`Project Route error: ${e}`)
        return res.status(500).json({ message: e })
    }
})

export default router