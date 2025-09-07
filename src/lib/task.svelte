<script lang="ts">
    import { invalidate } from "$app/navigation";
    import type { Task } from "./types";

    const {task, children}: {task: Task, children: any} = $props()

    async function onDone(target: HTMLInputElement) {
        const form = new FormData()
        form.append('done', String(target.checked))
        await fetch(`/api/tasks/${task.id}`, {method: 'PUT', body: form})
        invalidate(`/task/${task.id}`)
    }
</script>

<div>
    <input type="checkbox" checked={task.done} onchange={e => onDone(e.target as HTMLInputElement)} />
    {@render children()}
</div>
