import path from 'path'
import express from 'express'
import config from 'config'
import mongoose from 'mongoose'

import authRoutes from './routes/auth.routes'
import projectRoutes from './routes/project.routes'
import projectsRoutes from './routes/projects.routes'
import { prepareApplication } from './utils/prepareApplication'

const app = express()

app.use(express.json())

app.use('/api/auth', authRoutes)
app.use('/api/project', projectRoutes)
app.use('/api/projects', projectsRoutes)

const PORT = config.get('port') || 5000

{
    (async () => {
        await prepareApplication()
    })()
}

async function start() {
    try {
        await mongoose.connect(config.get('mongoURI'), {
            useNewUrlParser: true,
            useCreateIndex: true,
            useUnifiedTopology: true
        })
        app.listen(PORT, () => console.log(`App has been started on port ${PORT}`))
    } catch (e) {
        console.error(`Server Error: ${e.message}`)
        process.exit(1)
    }
}

start()
