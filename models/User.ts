import { Schema, model, Types, Document, Model } from 'mongoose'
import { IProject } from './Project'

export interface IUser {
    email: string
    password: string 
    name: string 
    nickname: string 
    projects: IProject[]
}

export interface IUserDocument extends IUser, Document {}
export interface IUserModel extends Model<IUserDocument> {}

const schema = new Schema({
    email: { type: String, required: true, unique: true },
    nickname: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    password: { type: String, required: true },
    projects: [{ type: Types.ObjectId, ref: 'Project' }]
})


export default model<IUserDocument>('User', schema)