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

export interface StationAverages {
    hour: string
    [Station.s33]: number
    [Station.s32]: number
    [Station.s28]: number
}

export const stationColorMap: { [key in Station]: string } = {
    [Station.s28]: '#fa582f',
    [Station.s32]: '#80cf4c',
    [Station.s33]: '#4ccdcf',
}
