import fs from 'fs'
import { Router, Request, Response } from 'express'
import Project, { IProjectModel, IProject } from '../models/Project'
import { uploadMiddleware } from '../storage/Storage';
import User from '../models/User';
import { Types } from 'mongoose';
import { Lecture } from '../core/Lecture';
import path from 'path'
import { WitAI } from '../core/transcriber/WitAI/WitAI';

const router = Router()

type ProjectUploadData = {
    userID: string
    email: string
    title: string
    description: string
    youtubeURL: string
    file?: File
} | {
    userID: string
    email: string
    title: string
    description: string
    file: File
    youtubeURL?: string
} | {
    userID: string
    email: string
    title: string
    description: string
    youtubeURL: string
    file: File
};

// /api/project/create
router.post('/create', uploadMiddleware, async (req: Request, res: Response) => {
    try {
        const { title, description, youtubeURL, email }: ProjectUploadData = req.body
        const { file } = req

        if (!email) {
            return res.status(403).json({ message: `Can't get user's email. Check correctness of your authentication and try again.` })
        }

        const authorID = (await User.findOne({ email }))?._id as Types.ObjectId
        console.log(authorID)

        const project = new Project({
            title,
            sources: {
                filename: file.filename,
                youtubeURL
            },
            author: {
                email,
                id: authorID
            }
        })

        await project.save()

        return res.status(201).json({ message: 'Project was created' })
    } catch (e) {
        console.error(`Project Route error: ${e}`)
        return res.status(500).json({ message: 'Something went wrong, try again' })
    }
})

// /api/project/transcribe
router.post('/transcribe', async (req: Request, res: Response) => {
    try {
        // TODO: Replace email to userID everywhere it used
        const projectID: string = req.body.projectID // !!!!
        
        const project = await Project.findById(projectID)

        if (!project) {
            return res.status(500).json({ message: 'Unknown project id' })
        }

        const { email } = project.author

        const filePath = path.resolve(__dirname, `../storage/users/${email}/${project.sources.filename}`)
        const result = WitAI.transcribe(filePath, 'RU')

        return res.status(201).json({ message: 'The file was found and sent for recognizing' })
    } catch (e) {
        console.error(`Transcribe route error: ${e}`)
    }
})

export default router