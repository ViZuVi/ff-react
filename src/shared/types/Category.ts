export type Category = {
    id: number,
    name: string,
    type: {
        id: 0 | 1
        name: string
    },
    icon?: string
}

export type CategoryCreate = {
    name: string,
    type: number
}