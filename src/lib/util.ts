import type { Sort, Task } from "./types";
import z, { ZodError } from "zod";

export function sortFilterTasks(tasks: Task[], sort: Sort, filter: string) {
    return tasks
        .map((task, i) => [task, i] as [Task, number])
        .sort(([t1], [t2]) => {
            if (sort.by === 'title') {
                if (sort.ascending.title) {
                    return t1.title < t2.title ? -1 : 1
                }
                return t1.title > t2.title ? -1 : 1
            }
            if (!t1.due_date || !t2.due_date) {
                return 0
            }
            const due1 = Date.parse(t1.due_date as string)
            const due2 = Date.parse(t2.due_date as string)
            if (sort.ascending.due) {
                return due1 < due2 ? -1 : 1
            }
            return due1 > due2 ? -1 : 1
        })
        .filter(([task]) => task.title.includes(filter))
}

export const taskValidationFields = {
    title: z.string().max(100).min(1),
    description: z.string().max(500).optional(),
    due_date: z.string().optional(),
    photo: z.file().optional(),
}

export const newTaskSchema = z.object(taskValidationFields)

export function formatValidationError(err: ZodError<any>) {
    return err.issues.map(issue => `${issue.path.join('.')}: ${issue.message}`).join('\n')
}
