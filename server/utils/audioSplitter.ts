import path from 'path'
import ffmpeg from 'fluent-ffmpeg'
import { WitAI } from '../core/transcriber/WitAI/WitAI'

// ffmpeg -i long.mp3 -acodec copy -ss 00:00:00 -t 00:30:00 half1.mp3
export async function audioSplitter(inputPath: string, sections: string) {
    const startAndFinish = sections.split('-')
    const start = startAndFinish[0].trim()
    const duration = WitAI.rangeDurationInSeconds


    const fileNameParts = inputPath.split('.')
    const ext = fileNameParts[fileNameParts.length - 1]

    const randomName = `${Math.random().toString(36).substring(7)}-${Date.now()}.${ext}`
    const outputPath = path.resolve('storage', 'temp', randomName)

    await new Promise<void>(resolve => {
        ffmpeg(inputPath)
            .inputOptions([`-ss ${start}`])
            .outputOptions([ `-t ${duration}` ])
            .output(outputPath)
            .on('end', () => resolve())
            .on('error', err => console.error(err))
            .run()
    })

    return {
        name: randomName
    }
}