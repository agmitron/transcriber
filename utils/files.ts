import path from 'path'
import fs from 'fs'

export async function createInitialDirs() {
    
}

export async function isExisting(pathToFileOrDir: string) {
    try {
        return fs.existsSync(pathToFileOrDir)
    } catch (e) {
        return console.error(`File or directory does not exist: ${e}`)
    }
}

export async function clearDir(pathToDir: string) {
    try {
        const files = fs.readdirSync(pathToDir)
        if (!files) {
            return 
        }
        
        files.forEach(f => {
            fs.unlinkSync(path.join(pathToDir, f))
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