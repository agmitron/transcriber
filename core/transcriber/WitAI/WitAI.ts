import { Transcriber } from '../Transcriber';
import { getAudioDurationInSeconds } from 'get-audio-duration'
import fs from 'fs';
import axios, { AxiosRequestConfig } from 'axios'
import { ISTTServiceRequestBody, IWitAIResponse } from '../helpers';
import { AudioRange } from '../Range';
import { secondsToHHMMSS } from '../../../utils/time';
import { findInTemp } from '../../../utils/files';
import path from 'path';
// The wit.ai speech to text recognition service

interface IWitAITokens {
    [key: string]: string
}

interface IRequestBodyHeaders {
    Accept: string;
    Authorization: string;
    'Content-Type': string;
    'Transfer-Encoding': string;
}

export class WitAI extends Transcriber {
    private static rangeDurationInSeconds = 10
    private static endpointURL = 'https://api.wit.ai/speech'
    private static tokens: IWitAITokens = {
        EN: '3K4KWZ5X64MDO6ZCOXD55KCBQHLC2P6Z',
        RU: 'T27BOAXNS6UV3GCPCJGIJGVJF5PYDBA4'
    }

    constructor() {
        super()
    }

    public static async transcribe(filePath: string, language: string) {
        super.transcribe(filePath, language)
        const resolvedPath = path.resolve(filePath)
        const duration = await getAudioDurationInSeconds(resolvedPath)
        const aloneRange = duration <= this.rangeDurationInSeconds

        // TODO: Get a language
        if (aloneRange) {
            return new Promise<ISTTServiceRequestBody>((resolve, reject) => {
                fs.readFile(resolvedPath, async (e, buffer) => {
                    if (e) {
                        console.error(`WitAI.transcribe reading file error`)
                        return reject(e)
                    }

                    const value = { range: buffer, language }
                    return resolve(value)
                })
            })
                .then(async (value) => await this.sendToSTTService(value))
                .catch(e => console.error(`WitAI.trancribe file reading error: ${e}`))
        }

        const ranges = this.allocRangesArray(duration)
        const filled = this.fillRanges(ranges, resolvedPath)
        const result = await this.sendLongFileToSTT(filled, language)

        return result
    }

    private static getHeaders(language: string) {
        return {
            'Accept': 'audio/x-mpeg-3',
            'Authorization': `Bearer ${this.tokens[language]}`,
            'Content-Type': 'audio/mpeg3',
            'Transfer-Encoding': 'chunked'
        }
    }

    private static getRequestConfig(range: Buffer, language: string): AxiosRequestConfig {
        return {
            url: this.endpointURL,
            method: 'POST',
            data: range,
            headers: this.getHeaders(language)
        }
    }

    // This method returns an array, and the size of it is a ranges count
    private static allocRangesArray(duration: number) {
        const rangesCount = Math.ceil(duration / this.rangeDurationInSeconds)
        return new Array<null>(rangesCount)
            .fill(null)
    }

    private static async sendToSTTService({ range, language }: ISTTServiceRequestBody) {
        try {
            const config = this.getRequestConfig(range, language)
            const res = await axios(config)
            console.log({littleRes: res.data.text})
            return res.data
        } catch (e) {
            console.error(`sendToSTTService error: ${e}`)
        }
    }

    private static fillRanges(emptyRangesArray: null[], filePath: string) {
        return emptyRangesArray.map((_emptyEl, i) => {
            const from = i * this.rangeDurationInSeconds
            const to = from + this.rangeDurationInSeconds

            return new AudioRange(
                secondsToHHMMSS(from),
                secondsToHHMMSS(to),
                {
                    full: {
                        path: filePath
                    },
                    range: null // still is not done
                }
            )
        })
    }

    private static async sendLongFileToSTT(ranges: AudioRange[], language: string): Promise<string> {
        const pendingRanges = ranges.map(async range => {
            const split = await range.split
            const buffer = await findInTemp(split.name)
            if (!buffer) {
                return
            }
            const data = await this.sendToSTTService({range: buffer, language})

            return data.text
        })

        const doneRanges = await Promise.all(pendingRanges)
        return doneRanges.join('')
    }
}