import mongoose from 'mongoose'

interface IProject {
    title: string
    text: string
    email: string
    lang: string
}

interface IProjectModel extends IProject, mongoose.Document { }

export const ProjectSchema = new mongoose.Schema({
    title: { type: String, required: true },
    lang: { type: String, required: true },
    text: { type: String },
    email: { type: String, required: true }
})

const Project = mongoose.model<IProjectModel>('Project', ProjectSchema)

export default Project