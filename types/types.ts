export interface Record {
    direction: Direction
    seconds: number
    date: Date
    station: Station
}

export enum Direction {
    up = 'Up',
    down = 'Down',
}

export enum Station {
    top = '32',
    bottom = '28',
}
