import path from 'path'
import { WitAI } from './WitAI'
import { testUserName } from '../../../utils/constants'
import getAudioDurationInSeconds from 'get-audio-duration'
import { IWitAIResponse } from '../helpers'


const getFilePath = (isLong: boolean) => path.resolve(`storage/users/${testUserName}/test${isLong ? 'Long' : ''}.mp3`)
const transcriberRequest = (filePath: string) => WitAI.transcribe(filePath, 'EN')



describe('WitAI.transcribe method test (with short files)', () => {
    const filePath = getFilePath(false)    

    let result: IWitAIResponse

    beforeAll(async () => {
        result = await transcriberRequest(filePath)
    }, 7000)

    it('should be defined', () => {
        expect(WitAI.transcribe).toBeDefined()
    })

    it('should be an instance of Promise', () => {
        expect(transcriberRequest(filePath)).toBeInstanceOf(Promise)
    })

    it('should return an object that have a text property', async () => {
        expect(result).toHaveProperty('text')
        expect(result.text.length).toBeGreaterThan(0)
    })
})

describe('WitAI.transcribe method test (with long files)', () => {
    const filePath = getFilePath(true)
    let duration: number
    beforeAll(async () => {
        duration = await getAudioDurationInSeconds(filePath)
    }, 5000)

    it('the duration of file should be greater than 10 seconds', async () => {
        expect(duration).toBeGreaterThan(10)
    })

    it('should return an object with the text property', async () => {
        const response: IWitAIResponse = await transcriberRequest(filePath)
        expect(response).toHaveProperty('text')
    }, 15000)
})