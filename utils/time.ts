export function secondsToHHMMSS(secondsSummary: number): string {
    const secondsInMinute = 60
    const minutesInHour = 60
    let minutes: string | number = Math.floor(secondsSummary / secondsInMinute)
    let hours: string | number = '00'

    if (minutes >= 60) {
        hours = Math.floor((minutes as number) / minutesInHour)
        minutes = (minutes as number) % minutesInHour 
    }

    if (minutes < 10) {
        minutes = `0${minutes}`
    }

    if (hours !== '00' && hours < 10) {
        hours = `0${hours}`
    }

    let secondsRemained: string | number = secondsSummary % secondsInMinute

    if (secondsRemained < 10) {
        secondsRemained = `0${secondsRemained}`
    }

    return `${hours}:${minutes}:${secondsRemained}`
}

export function createRange(from: string, to: string) {
    return `[${from} - ${to}]`
}