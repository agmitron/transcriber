import fs from 'fs'
import path from 'path'

interface ILecture {
    file: ILectureFile
}

interface ILectureFile {
    meta: Express.Multer.File
    buffer: Buffer
}

interface ILectureProps {
    fileMeta: Express.Multer.File
    owner: string
}

export class Lecture implements ILecture {
    file: ILectureFile
    constructor(props: ILectureProps) {
        const filePath = path.resolve(__dirname, `../storage/users/${props.owner}`, props.fileMeta.filename)
        console.log('filePath: ', filePath)

        this.file = {
            meta: props.fileMeta, 
            buffer: fs.readFileSync(filePath)
        }
    }

    onRecognized() {
        // upload to db
        // emit 
    }
}