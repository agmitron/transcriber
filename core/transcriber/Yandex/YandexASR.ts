import axios from 'axios'
import FormData from 'form-data'
import fs, { createReadStream } from 'fs'
import { Transcriber } from '../Transcriber'

const secret = `AQVN12l1ZhamaNuCbT6F5e2-lxhH0kHtTxapprGd`

interface ILoadFileToBucketResponse {

}

export default class YandexASR extends Transcriber {
    public static async transcribe(filePath: string, language: string) {
        super.transcribe(filePath, language)
        return ``
    }

    public static async loadFileToBucket(filePath: string) {
        try {
            const form = new FormData()
            form.append('file', createReadStream(filePath))
            form.append('key', filePath)
    
            const result = await axios.post(
                `https://storage.yandexcloud.net/transcribarium`, form, {
                headers: form.getHeaders(),
                // maxBodyLength: Infinity,
                // maxContentLength: Infinity
            })
    
            console.log({ result })
    
            return result
        } catch (e) {
            console.error(`Error while loading a file to bucket: `, e)
            return { error: e }
        }
    }
}