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

export const getSortedTasks = () => state.tasks
    .map((task, i) => [task, i] as [Task, number])
    .sort(([t1], [t2]) => {
        if (state.sort.by === 'title') {
            if (state.sort.ascending.title) {
                return t1.title < t2.title ? -1 : 1
            }
            return t1.title > t2.title ? -1 : 1
        }
        if (!t1.due_date || !t2.due_date) {
            return 0
        }
        const due1 = Date.parse(t1.due_date as string)
        const due2 = Date.parse(t2.due_date as string)
        if (state.sort.ascending.due) {
            return due1 < due2 ? -1 : 1
        }
        return due1 > due2 ? -1 : 1
    })
