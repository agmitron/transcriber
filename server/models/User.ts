import mongoose from 'mongoose'
import Project from './Project'

interface IUser {
    full_name: string
    login: string
    password: string
    email: string
    projects: typeof Project[]
}

interface IUserModel extends IUser, mongoose.Document { }

export const ProjectSchema = new mongoose.Schema({
    full_name: { type: String, required: true },
    login: { type: String, required: true },
    password: { type: String, required: true },
    email: { type: String, required: true },
    projects: [{ type: mongoose.Types.ObjectId, ref: 'Project' }]
})

const User = mongoose.model<IUserModel>('User', ProjectSchema)

export default User