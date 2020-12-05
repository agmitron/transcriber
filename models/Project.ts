import { Schema, model, Types, Document, Model } from 'mongoose'
import { IUser } from './User'

interface IProjectSchema extends Document {
    title: string
    recognizedText: string
    sources: {
        filename: string
        youtubeURL: string
    }
    author: {
        id: Types.ObjectId
        name: string
        email: string
    }
    teacher: {
        id: Types.ObjectId
        name: string
    }
}

const schema = new Schema({
    title: { type: String, required: true },
    recognizedText: { type: String },
    sources: {
        filename: { type: String },
        youtubeURL: { type: String }
    },
    author: {
        id: { type: Types.ObjectId, ref: 'User' },
        name: { type: String },
        email: { type: String, required: true }
    },
    // teacher: {
    //     id: { type: Types.ObjectId },
    //     name: { type: String }
    // }
})

interface IProjectBase extends IProjectSchema { }
export interface IProject extends IProjectBase { }
export interface IProjectModel extends Model<IProject> { }

export default model<IProject, IProjectModel>('Project', schema)