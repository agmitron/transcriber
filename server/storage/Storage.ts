import fs from 'fs'
import { v4 as uuid } from 'uuid'
import multer from 'multer'
import path from 'path'
import { getJWTfromRequest } from '../routes/helpers'

const storageConfig = multer.diskStorage({
    destination(req, _, cb) {
        const { userID } = getJWTfromRequest(req)
        const destination = `storage/users/${userID}/`
        fs.mkdir(destination, () => {
            cb(
                null,
                destination
            )
        })
    },
    filename: (req, file, cb) => {
        const ext = path.extname(file.originalname)
        cb(
            null,
            `${uuid()}${ext}`
        )
    }
})

export const uploadMiddleware = multer(({ storage: storageConfig })).single('file')

class VedaStorage {
    constructor() { }

    upload() {

    }

    download() {

    }
}

const storage = new VedaStorage()

export { storage }
export default VedaStorage