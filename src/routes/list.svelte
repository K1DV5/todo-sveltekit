<script lang="ts">
    import type {Task} from "$lib/types";
    import TaskComp from "$lib/task.svelte";

    const {nearest, tasks}: { nearest: Task, tasks: Task[] } = $props();
</script>

{#if nearest}
    <div class="border rounded my-4 relative">
        {#if nearest.photo}
            <a href="/task/{nearest.id}" class="block">
                <img alt="Task" class="rounded-t w-full object-cover h-30" src={nearest.photo} />
            </a>
        {/if}
        <div class="p-2">
            <TaskComp task={nearest}>
                <a href="/task/{nearest.id}" class="block mx-1">
                    <span>{nearest.title}</span>
                    {#if nearest.due_date}
                        <div class="text-xs text-gray-400">
                            {new Date(nearest.due_date).toLocaleString()}
                        </div>
                    {/if}
                </a>
            </TaskComp>
            {#if nearest.description}
                <div class="p-2 text-gray-400">{nearest.description}</div>
            {/if}
        </div>
    </div>
{/if}

{#each tasks.filter((t) => t.id !== nearest.id) as task}
    <div class="border rounded mt-2 p-2">
        <TaskComp {task}>
            <a
                href="/task/{task.id}"
                class="block p-1 flex-grow {task.done ? 'line-through text-gray-400' : ''}"
            >
                {task.title}
            </a>
        </TaskComp>
    </div>
{/each}
