import express from 'express'
import ffmpeg from 'fluent-ffmpeg'
// @ts-ignore
import ffmpegInstaller from '@ffmpeg-installer/ffmpeg'
import path from 'path'
import config from 'config'
import mongoose from 'mongoose'
import projectsRoutes from './routes/projects.routes'
import authRoutes from './routes/auth.routes'
import profileRoutes from './routes/profile.routes'

const app = express()
// Add headers
app.use((req, res, next) => {
    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:80')

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE')

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type')

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', 'true')

    // Pass to next layer of middleware
    next()
})

app.use(express.json())
app.use('/api/auth', authRoutes)
app.use('/api/projects', projectsRoutes)
app.use('/api/profile', profileRoutes)

ffmpeg.setFfmpegPath(ffmpegInstaller.path)

// returns static (react app, styles, etc)
if (process.env.NODE_ENV === 'production') {
    app.use('/', express.static(path.join(__dirname, '../client', 'build')))

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, '../client', 'build', 'index.html'))
    })
}

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
