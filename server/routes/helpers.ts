export type ProjectUploadData = {
    email: string
    title: string
    file: File
    text: string
    lang: string
    type: 'yandex' | 'wit'
}