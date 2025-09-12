import type { Task, Sort } from "./types";

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
