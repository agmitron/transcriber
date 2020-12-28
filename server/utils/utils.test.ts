import path from 'path'
import fs from 'fs'
import { secondsToHHMMSS } from './time'
import { isExisting, createInitialDirs } from './files'
import { testUserName } from './constants'
import { audioSplitter } from './audioSplitter'


const storageDir = path.resolve(__dirname, '../storage')
const initialStorageDir = {
    users: path.resolve(storageDir, 'users'),
    testAudio: path.resolve(storageDir, `users/${testUserName}/test.mp3`),
    longTestAudio: path.resolve(storageDir, `users/${testUserName}/testLong.mp3`)
}

describe('Tests for convertSecondsToMinutesAndSeconds function', () => {
    it('should be defined', () => {
        expect(secondsToHHMMSS).toBeDefined()
    })

    it('should return 00:06:05 minutes:seconds from 365 seconds', () => {
        expect(secondsToHHMMSS(365)).toBe(`00:06:05`)
    })

    it('should return 01:06:40 hours:minutes:seconds from 4000 seconds', () => {
        expect(secondsToHHMMSS(4000)).toBe(`01:06:40`)
    })

    it('should return 02:13:20 hours:minutes:seconds from 8000 seconds', () => {
        expect(secondsToHHMMSS(8000)).toBe(`02:13:20`)
    })

    it('should return 15:00:00 hours:minutes:seconds from 54000 seconds', () => {
        expect(secondsToHHMMSS(54000)).toBe(`15:00:00`)
    })
})

describe('Tests for directories on app initialization', () => {
    it('isExisting function should be defined and return true', () => {
        expect(isExisting).toBeDefined()
    })

    it('isExisting should return true for initial directories', async () => {
        await createInitialDirs()
        expect(await isExisting(initialStorageDir.users)).toBe(true)
        expect(await isExisting(initialStorageDir.testAudio)).toBe(true)
    })
})

describe('Tests for audioSplitter', () => {
    it('should return splits', async () => {
        const splitName = 'Split'
        const ranges = `[00:40 - 00:50] ${splitName}`
        const split = await audioSplitter(initialStorageDir.longTestAudio, ranges)
        expect(split).toBeDefined()
        const splitPath = path.resolve('storage', 'temp', `${splitName}.mp3`)
        const isSplitExisted = fs.existsSync(splitPath)

        if (isSplitExisted) {
            fs.unlinkSync(splitPath)
        }
    })
})