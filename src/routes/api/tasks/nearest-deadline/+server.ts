import { json } from "@sveltejs/kit";
import { data } from "$lib/server/db";

export function GET() {
    const tasks = data.data.filter(t => t.due_date != null)
    tasks.sort((t1, t2) => Date.parse(t1.due_date as string) < Date.parse(t2.due_date as string) ? -1 : 1)
    return json(tasks[0] ?? null)
}
