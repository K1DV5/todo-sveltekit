import { data } from "$lib/server/db";
import { error, json } from "@sveltejs/kit";
import type { RequestHandler } from "./$types";

export const GET: RequestHandler = ({params}) => {
    return json(data.data.find(t => t.id === params.id) ?? null)
}

export const PUT: RequestHandler = async ({params, request}) => {
    const task = data.get(params.id)
    if (task == null) {
        return error(404, 'Task not found')
    }
    const form = await request.formData()
    task.title = form.get('title')?.toString() ?? task.title
    task.description = form.get('description')?.toString() ?? task.description
    if (form.has('done')) {
        task.done = form.get('done')?.toString() === 'true'
    }
    const dueDate = form.get('due_date')?.toString()
    if (dueDate) {
        task.due_date = new Date(dueDate).toString()
    }
    await data.update(task, form.get('photo') as File)
    return json({ok: true})
}

export const DELETE: RequestHandler = async ({params}) => {
    const task = data.get(params.id)
    if (task == null) {
        return error(404, 'Task not found')
    }
    await data.delete(task.id)
    return json({ok: true})
}
