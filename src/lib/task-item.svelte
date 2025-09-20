<script lang="ts">
    import type { Task } from "./types";
    import TaskComp from './task.svelte'

    let {task = $bindable(), locale}: {task: Task, locale: string} = $props()
</script>

<div class="border rounded-xl mt-2">
    <TaskComp locale={locale} bind:task={task}>
            <a
                href="/{locale}/task/{task.id}"
                class="block pl-0 p-4 flex-grow"
            >
                <div class="{task.done ? 'line-through text-gray-400' : ''}">{task.title}</div>
            {#if task.due_date}
                <div class="text-xs text-gray-400 mt-2">
                    {new Date(task.due_date).toLocaleString()}
                </div>
            {/if}
            </a>
    </TaskComp>
</div>
