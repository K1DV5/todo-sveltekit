import { error, json } from "@sveltejs/kit";
import { data } from "$lib/server/db";
import type { RequestHandler } from "./$types";
import type { Task } from "$lib/types";
import { formatValidationError, newTaskSchema } from "$lib/util";

export function GET() {
    return json(data.data)
}

export const POST: RequestHandler = async ({request}) => {
    const form = await request.formData()
    const task: Task = {
        id: Date.now().toString(),
        title: form.get('title')?.toString() ?? '',
        done: false,
        description: form.get('description')?.toString(),
        due_date: form.get('due_date')?.toString(),
        created_at: new Date().toISOString(),
    }
    const pData = newTaskSchema.safeParse(task)
    if (!pData.success) {
        return error(400, formatValidationError(pData.error))
    }
    await data.add(task, form.get('photo') as File)
    return json({ok: true})
}
