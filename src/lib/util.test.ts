import { expect, test } from 'vitest'
import { formatValidationError, sortFilterTasks, taskValidationFields } from "./util";
import type {Task} from './types'

test('Sort filter works', () => {
    const tasks: Task[] = [
        {id: '0', done: false, created_at: '23/9/2025', title: 'Foo', due_date: '9/19/2025'},
        {id: '0', done: false, created_at: '23/9/2025', title: 'Bar', due_date: '9/21/2025'},
        {id: '0', done: false, created_at: '23/9/2025', title: 'Boo', due_date: '9/22/2025'},
    ]
    const sortedFiltered = sortFilterTasks(tasks, {by: 'title', ascending: {title: true, due: false}}, 'oo')
    expect(sortedFiltered).toHaveProperty('length', 2)
    expect(sortedFiltered).toHaveProperty('0', [tasks[2], 2])
})

test('Form validation', () => {
    const data = taskValidationFields.title.safeParse('')
    expect(data.success).toBe(false)
    if (data.error) {
        expect(formatValidationError(data.error).length).toBeGreaterThan(0)
    }
})
