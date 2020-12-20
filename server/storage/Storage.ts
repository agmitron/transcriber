import fs from 'fs'
import multer from 'multer'

const storageConfig = multer.diskStorage({
    destination(req, _, cb) {
        const destination = `storage/users/${req.body.email}/`
        fs.mkdir(destination, () => {
            cb(
                null, 
                destination
            )
        })
    },
    filename: (req, file, cb) => {
        cb(
            null,
            `${Math.random().toString(36).substring(7)}-${file.originalname}`
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