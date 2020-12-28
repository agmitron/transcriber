import { create } from 'domain'
import mongoose, { Schema, Document, SchemaDefinition } from 'mongoose'

const createModel = <M extends SchemaDefinition, S extends Schema>(model: M, name?: string) => {
    type Model = M & Document

    const schema = new Schema<Model>(model)

    if (!name) {
        name = Object.keys(model)[0]
    }

    return mongoose.model(name, schema)
}


const A = createModel({
    title: {type: String, required: true}
})

const a = new A({})

export default createModel