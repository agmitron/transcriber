import express from 'express'
import config from 'config'
import mongoose from 'mongoose'
import projectsRoutes from './routes/projects.routes'

const app = express()

app.use(express.json())
app.use('/api/projects', projectsRoutes)

const PORT = config.get('port') || 5000

async function start() {
    try {
        await mongoose
            .connect(config.get('mongoURI'), {
                useNewUrlParser: true,
                useCreateIndex: true,
                useUnifiedTopology: true
            })

        console.log('Connection to MongoDB succeed')
        app.listen(PORT, () => console.log(`App has been started on port ${PORT}`))
    } catch (e) {
        console.error(`Server Error: ${e.message}`)
        process.exit(1)
    }
}

start()
