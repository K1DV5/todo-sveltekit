import type { Task } from '$lib/types'
import type { PageLoad } from './$types'

export const load: PageLoad = async ({fetch}) => {
    const tasks = await fetch('/api/tasks')
    const nearest = await fetch('/api/tasks/nearest-deadline')
    return {
        tasks: await tasks.json() as Task[],
        nearest: await nearest.json() as Task,
    }
}
