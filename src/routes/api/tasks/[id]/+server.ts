import { data } from "$lib/server/db";
import { error, json } from "@sveltejs/kit";
import type { RequestHandler } from "./$types";

export const GET: RequestHandler = ({params}) => {
    const task = data.data.find(t => t.id === params.id)
    if (!task) {
        return error(404, 'Task not found')
    }
    return json(task)
}

export const PUT: RequestHandler = async ({params, request}) => {
    const task = data.get(params.id)
    if (task == null) {
        return error(404, 'Task not found')
    }
    const form = await request.formData()
    task.title = form.get('title')?.toString() ?? task.title
    task.description = form.get('description')?.toString() ?? task.description
    task.due_date = form.get('due_date')?.toString() || task.due_date
    if (form.has('done')) {
        task.done = form.get('done')?.toString() === 'true'
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
