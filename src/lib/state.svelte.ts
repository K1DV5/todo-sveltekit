import type { Task, Sort } from "./types";

type State = {
    filter: string,
    tasks: Task[],
    deletedIds: Set<string>,
    nearest: Task | null,
    sort: Sort,
    listView: boolean,
}

export const state: State = $state({
    tasks: [],
    deletedIds: new Set(),
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
