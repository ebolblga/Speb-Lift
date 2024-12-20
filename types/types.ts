export interface Record {
    id: number
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
    s33 = '33',
    s32 = '32',
    s28 = '28',
}
