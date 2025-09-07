import type { Task } from "$lib/types";
import type { PageLoad } from "./$types";

export const load: PageLoad = async ({params, fetch}) => {
    const task = await fetch(`/api/tasks/${params.id}`)
    return {
        task: await task.json() as Task,
    }
}
