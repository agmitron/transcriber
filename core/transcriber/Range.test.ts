import path from 'path'
import { AudioRange } from './Range'
import { createRange, secondsToHHMMSS } from '../../utils/time'
import { testUserName } from '../../utils/constants'
import { clearDir } from '../../utils/files'


describe('Tests for Range.split', () => {
    const from = secondsToHHMMSS(40)
    const to = secondsToHHMMSS(50)
    const filePath = path.resolve(`storage/users/${testUserName}/testLong.mp3`)
    const tempDir = path.resolve(`storage/temp`)

    let range: AudioRange

    beforeEach(() => {
        range = new AudioRange(from, to, {
            full: {
                path: filePath
            },
            range: null // still is not done
        })
    })

    afterEach(async () => {
        try {
            await clearDir(tempDir)
        } catch (e) {
            return console.error(`Range.test.ts afterEach error: ${e}`)
        }
    })

    it('should be defined', () => {
        expect(range.split).toBeDefined()
    })

    it('transcribe should be an async function (so return a promise)', () => {
        expect(range.split).toBeInstanceOf(Promise)
    })

    it('after we transcribe a range, it should put the path of a cutted section into range._file.range.path', async () => {
        expect(range.files.range).toBe(null)
        const split = await range.split
        range.rangeFilePath = split.name
        expect(typeof range.files.range?.path).toBe('string')
    })
})