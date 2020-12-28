import axios from 'axios'
import FormData from 'form-data'
import fs, { createReadStream } from 'fs'
import { convertToOgg } from '../../../utils/files'
import { Transcriber } from '../Transcriber'

const secret = `AQVN0WyJw5N51qC4SJ2WWQf9sW01Q6m6Bjs2HyOt`

interface ILoadFileToBucketResponse {

}

export default class YandexASR extends Transcriber {
    public static async transcribe(filePath: string, language: string) {
        super.transcribe(filePath, language)
        const loadedFilePath = await this.loadFileToBucket(filePath)
        const result = await axios.post(`https://transcribe.api.cloud.yandex.net/speech/stt/v2/longRunningRecognize`, {
            audio: {
                uri: loadedFilePath
            },
            config: {
                specification: {
                    languageCode: language,
                }
            }
        })

        return result
    }

    public static async loadFileToBucket(filePath: string) {
        try {
            const converted = await convertToOgg(filePath)
            console.log({converted})
            const form = new FormData()
            form.append('key', filePath)
            form.append('file', createReadStream(filePath), filePath)

            await axios.post(
                `https://storage.yandexcloud.net/transcribarium.com`,
                form,
                { headers: form.getHeaders() }
            )

            return {
                filePathInBucket: `https://storage.yandexcloud.net/transcribarium.com/${filePath}`
            }
        } catch (e) {
            console.error(`Error while loading a file to bucket: `, e)
            return { error: e }
        }
    }
}