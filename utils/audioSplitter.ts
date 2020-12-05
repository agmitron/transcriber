import MediaSplit from 'media-split'
import path from 'path'

export interface IFragment {
    name: string 
    start: string 
    end: string 
    trackName: string
}

// The section should look like: [01:30 - 03:50] - there is a special function createRange
export async function audioSplitter(inputPath: string, ranges: string): Promise<IFragment> {
    const split = new MediaSplit({
        input: inputPath,
        sections: [ranges],
        output: path.resolve('storage', 'temp')
    })

    const fragments = await split.parse()

    return fragments[0]
}