export type Task = {
    id: string
    title: string
    done: boolean
    description?: string
    due_date?: string
    photo?: string
}

export type SortBy = 'due' | 'title'

export type Sort = {
    by: SortBy,
    ascending: {[k in SortBy]: boolean},
}
