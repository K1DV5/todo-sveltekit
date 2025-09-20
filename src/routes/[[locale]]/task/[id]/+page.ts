import type { Task } from "$lib/types";
import { error } from "@sveltejs/kit";
import type { PageLoad } from "./$types";

export const load: PageLoad = async ({params, fetch}) => {
    const res = await fetch(`/api/tasks/${params.id}`)
    if (!res.ok) {
        error(res.status, 'Not found')
    }
    return {
        task: await res.json() as Task,
    }
}
