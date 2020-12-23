interface ITranscriberOption { name: string, code: string }

export const engineList: ITranscriberOption[] = [
    {
        code: 'wit',
        name: 'WitAI'
    },
    {
        code: 'yandex',
        name: 'Yandex'
    },
]



export const languageList: { engine: string, languages: ITranscriberOption[] }[] = [
    {
        engine: 'wit',
        languages: [
            {
                code: 'ru',
                name: 'Русский'
            },
            {
                code: 'en',
                name: 'English'
            },
        ]
    },
    {
        engine: 'yandex',
        languages: [
            {
                code: 'ru',
                name: 'Русский'
            },
        ]
    }
]