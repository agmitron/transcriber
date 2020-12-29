import axios from 'axios'
import FormData from 'form-data'
import fs, { createReadStream } from 'fs'
import getAudioDurationInSeconds from 'get-audio-duration'
import path from 'path'
import { convertToOgg } from '../../../utils/files'
import { sleep } from '../../../utils/time'
import { Transcriber } from '../Transcriber'

const secret = `AQVN0WyJw5N51qC4SJ2WWQf9sW01Q6m6Bjs2HyOt`

interface IYandexASRResultResponse {
    done: boolean
    response: {
        '@type': string
        chunks: {
            alternatives: {
                text: string
                confidence?: 1
            }[]
        }[]
    }
    id: string
    createdAt: string
    createdBy: string
    modifiedAt: string
}

interface IYandexASROperation {
    done: boolean,
    id: string,
    createdAt: string,
    createdBy: string,
    modifiedAt: string
}

type TranscribingDone = { done: boolean, result?: string }

export default class YandexASR extends Transcriber {
    // https://cloud.yandex.ru/docs/speechkit/stt/transcribation
    public static async transcribe(filePath: string, language: string) {
        super.transcribe(filePath, language)
        try {
            const loadedFilePath = await this.loadFileToBucket(filePath)
            console.log({ loadedFilePath })
            const body = JSON.stringify({
                audio: {
                    uri: loadedFilePath
                },
                config: {
                    specification: {
                        languageCode: 'ru-RU',
                    }
                }
            })

            const { data } = await axios.post<IYandexASROperation>(
                `https://transcribe.api.cloud.yandex.net/speech/stt/v2/longRunningRecognize`, body,
                {
                    headers: {
                        Authorization: `Api-Key ${secret}`
                    }
                }
            )

            // Количество запросов на проверку результатов ограничено, 
            // поэтому учитывайте скорость распознавания: 1 минута одноканального аудио 
            // распознается примерно за 10 секунд.
            const duration = (await getAudioDurationInSeconds(filePath)) * 100 // ~ (* 1000 / 10)
            await sleep(duration)
            const { result } = await this.getResult(data.id)
            console.log({ result })
            // if (done) {
            //     console.log('Done!!!')

            // }

            return result
        } catch (e) {
            console.error(e)
        }
    }

    public static async loadFileToBucket(filePath: string) {
        try {
            const convertedPath = await convertToOgg(filePath)
            const baseName = path.basename(convertedPath)
            console.log({ convertedPath })
            const form = new FormData()
            form.append('key', baseName)
            form.append('file', createReadStream(convertedPath), baseName)

            await axios.post(
                `https://storage.yandexcloud.net/transcribarium.com`,
                form,
                { headers: form.getHeaders() }
            )

            return `https://storage.yandexcloud.net/transcribarium.com/${baseName}`

        } catch (e) {
            console.error(`Error while loading a file to bucket: `, e)
            return { error: e }
        }
    }

    public static async getResult(operationID: string): Promise<TranscribingDone> {
        const { data } = await axios.get<IYandexASRResultResponse>(
            `https://operation.api.cloud.yandex.net/operations/${operationID}`,
            {
                headers: {
                    Authorization: `Api-Key ${secret}`
                }
            }
        )

        if (!data.done) {
            await sleep(3000)
            return this.getResult(operationID)
        }

        if (data?.response) {
            const result = this.concatResultChunks(data.response.chunks)

            return {
                done: data.done,
                result
            }
        }

        return { done: false }
    }

    public static concatResultChunks =
        (chunks: IYandexASRResultResponse['response']['chunks']) =>
            chunks
                .map(ch => ch.alternatives[0].text)
                .join(' ')
}