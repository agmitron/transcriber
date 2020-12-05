import { createRange } from '../../utils/time'
import { IAudioFile } from './helpers'
import { runInThisContext } from 'vm'
import { audioSplitter, IFragment } from '../../utils/audioSplitter'
import { tempDirPath } from '../../utils/constants'

interface IRange {
    from: string // 'minute:second' ('01:50') 
    to: string
    result: string | null // by default is null
    files: IRangeFiles
}

interface IRangeFiles {
    full: { path: string }
    range: { path: string } | null
}

export class AudioRange implements IRange {
    private _from: string
    private _to: string
    private _result: string | null = null
    private _files: IRangeFiles
    constructor(from: string, to: string, files: IRangeFiles) {
        this._from = from
        this._to = to
        this._files = files
    }

    set result(result: string | null) {
        if (!this.result) {
            return
        }

        this._result = result
    }

    get result() {
        return this._result
    }

    get from() {
        return this._from
    }

    get to() {
        return this._to
    }

    get files() {
        return this._files
    }

    set rangeFilePath(fileName: string) {
        this.files.range = {
            path: `${tempDirPath}/${fileName}`
        }
    }

    get ranges() {
        return createRange(this.from, this.to)
    }

    get split() {
        return new Promise<IFragment>(async (resolve, reject) => {
            try {
                const uniqueName = `${Date.now()}-${createRange(this.from, this.to)}`
                const split = await audioSplitter(this.files.full.path, `${this.ranges} ${uniqueName}`)
                return resolve(split)
            } catch (e) {
                return reject(e)
            }
        })
    }
}