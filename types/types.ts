export interface Record {
    direction: Direction
    seconds: number
    date: Date
    station: Station
}

interface RecordSerialized {
    direction: Direction
    timing: number
    date: string
    station: Station
}

export enum Direction {
    up = 'Up',
    down = 'Down',
}

export enum Station {
    top = '28',
    bottom = '32',
}
