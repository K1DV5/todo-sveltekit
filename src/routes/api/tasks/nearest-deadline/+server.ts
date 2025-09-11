import { json } from "@sveltejs/kit";
import { data, withPhotoUrl } from "$lib/server/db";

export function GET() {
    const tasks = data.data.filter(t => t.due_date)
    tasks.sort((t1, t2) => Date.parse(t1.due_date as string) > Date.parse(t2.due_date as string) ? -1 : 1)
    return json(withPhotoUrl(tasks[0] ?? null))
}
