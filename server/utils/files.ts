import path from 'path'
import fs from 'fs'


export async function clearDir(pathToDir: string) {
    try {
        const files = fs.readdirSync(pathToDir)
        if (!files) {
            return 
        }
        
        files.forEach(f => {
            if (f !== '.gitignore') {
                fs.unlinkSync(path.join(pathToDir, f))
            }            
        })
    } catch (e) {
        console.error(`Clear dir error: ${e}`)
    }
}

export async function findInTemp(fileName: string) {
    try {
        const filePath = path.resolve('storage', 'temp', fileName)
        return fs.readFileSync(filePath)
    }   catch (e) {
        console.error(`Error during search in the temp directory: ${e}`)
    }
}