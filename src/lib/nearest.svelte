<script lang="ts">
    import type { Task } from "./types";
    import TaskComp from './task.svelte'

    let {task = $bindable(), locale}: {task: Task, locale: string} = $props()
</script>

<div class="border rounded-xl bg-yellow-500/20 my-4 relative">
    {#if task.photo}
        <a href="/{locale}/task/{task.id}" class="block">
            <img alt="Task" class="rounded-t w-full object-cover h-30" src={task.photo} />
        </a>
    {/if}
    <div class="p-2">
        <TaskComp locale={locale} bind:task={task}>
            <a href="/${locale}/task/{task.id}" class="block p-4 pl-0 flex-grow"
            >
                <div class="font-bold {task.done ? 'line-through text-gray-400' : ''}">{task.title}</div>
                {#if task.due_date}
                    <div class="text-xs text-gray-400">
                        {new Date(task.due_date).toLocaleString()}
                    </div>
                {/if}
                {#if task.description}
                    <div class="pt-2 text-gray-400">{task.description}</div>
                {/if}
            </a>
        </TaskComp>
    </div>
</div>
