<script lang="ts">
    import { invalidate } from "$app/navigation";
    import { Circle, CircleCheck } from "@lucide/svelte";
    import type { Task } from "./types";

    const {task = $bindable(), children, locale}: {task: Task, locale: string, children: any} = $props()

    async function onDone(e: Event) {
        e.stopPropagation()
        task.done = !task.done
        const form = new FormData()
        form.append('done', String(task.done))
        // @wc-ignore
        await fetch(`/api/tasks/${task.id}`, {method: 'PUT', body: form})
        invalidate(`/${locale}/task/${task.id}`)
    }
</script>

<div class="flex items-start">
    <button onclick={onDone} class="p-4">
        {#if task.done}
            <CircleCheck />
        {:else}
            <Circle />
        {/if}
    </button>
    {@render children()}
</div>
