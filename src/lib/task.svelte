<script lang="ts">
    import { invalidate } from "$app/navigation";
    import type { Task } from "./types";

    const {task = $bindable(), children}: {task: Task, children: any} = $props()

    async function onDone(e: Event) {
        const target = e.target as HTMLInputElement
        task.done = target.checked
        const form = new FormData()
        form.append('done', String(target.checked))
        await fetch(`/api/tasks/${task.id}`, {method: 'PUT', body: form})
        invalidate(`/task/${task.id}`)
    }
</script>

<div class="flex items-begin">
    <input class="m-2" type="checkbox" onclick={e => {e.stopPropagation()}} checked={task.done} onchange={onDone} />
    {@render children()}
</div>
