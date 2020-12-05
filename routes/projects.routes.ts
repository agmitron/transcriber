import { Router, Request, Response } from 'express';
import Project from '../models/Project';

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


export default router