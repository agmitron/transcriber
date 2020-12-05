import fs from 'fs'
import multer from 'multer'

const storageConfig = multer.diskStorage({
    destination: (req, file, cb) => {
        const destination = `storage/users/${req.body.email}/`
        fs.mkdir(destination, () => {
            cb(
                null, 
                destination
            )
        })
    },
    filename: (req, file, cb) => {
        const mimeTypes = file.mimetype.split('/')
        const ext = mimeTypes[mimeTypes.length - 1]
        cb(
            null,
            `${file.originalname}.${ext}`
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