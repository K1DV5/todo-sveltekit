import type { Task } from "./types";

type SortBy = 'due' | 'title'
type SortDir = 'asc' | 'desc'

type Sort = {
    by: SortBy,
    direction: SortDir,
}

type State = {
    filter: string,
    tasks: Task[],
    nearest: Task | null,
    sort: Sort,
    listView: boolean,
}

export const state: State = $state({
    tasks: [],
    nearest: null,
    filter: '',
    sort: {
        by: 'due',
        direction: 'desc',
    },
    listView: true,
})
