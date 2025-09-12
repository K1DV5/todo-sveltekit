import type { Task } from "./types";

export type SortBy = 'due' | 'title'

type Sort = {
    by: SortBy,
    ascending: {[k in SortBy]: boolean},
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
        ascending: {
            title: true,
            due: false,
        },
    },
    listView: true,
})
