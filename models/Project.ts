import mongoose from 'mongoose'
import User from './User'
interface IProject {
    title: string
    text: string
    lang: string
    author: string
}

interface IProjectModel extends IProject, mongoose.Document { }

export const ProjectSchema = new mongoose.Schema({
    title: { type: String, required: true },
    lang: { type: String, required: true },
    text: { type: String },
    author: { type: mongoose.Types.ObjectId, ref: 'User' }
})

const Project = mongoose.model<IProjectModel>('Project', ProjectSchema)

export default Project