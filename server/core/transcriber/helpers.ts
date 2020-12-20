export type range = string // '10:10'

export interface ISTTServiceRequestBody {
    range: Buffer
    language: string
}

export interface IWitAIResponse {
    text: string
}

export interface IAudioFile {
    path: string
}