import type { Task, Sort } from "./types";

type State = {
    filter: string,
    locale: string,
    tasks: Task[],
    deletedIds: Set<string>,
    nearest: Task | null,
    sort: Sort,
    listView: boolean,
    alert?: {
        type: 'error' | 'success'
        message: string
    },
    question?: string
    loading: boolean
}

export const state: State = $state({
    tasks: [],
    deletedIds: new Set(),
    nearest: null,
    locale: 'en',
    filter: '',
    sort: {
        by: 'due',
        ascending: {
            title: true,
            due: false,
        },
    },
    listView: true,
    loading: false,
})
