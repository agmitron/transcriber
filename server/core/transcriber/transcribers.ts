import { WitAI } from './WitAI/WitAI';
import YandexASR from './Yandex/YandexASR'

const transcribers = {
    wit: WitAI,
    yandex: YandexASR
}

export default transcribers