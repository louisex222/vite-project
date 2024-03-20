export interface InterCategory {
    id: number
}
export interface InterCreateImage {
    (imagePath: string, id: string): string
}

export interface InterSlotGame {
    name: string,
}

export interface InterMixList {
    clubId: number
    categoryIdList: number[]
    sort: number
}

export interface InterList {
    clubId: number
    id: number
}