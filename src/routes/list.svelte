<script lang="ts">
    import type {Task} from "$lib/types";
    import TaskComp from "$lib/task.svelte";

    const {nearest: nearestO, tasks: tasksO}: { nearest: Task, tasks: Task[] } = $props();
    let {nearest, tasks} = $state({nearest: nearestO, tasks: tasksO})
</script>

{#if nearest}
    <div class="border rounded my-4 relative">
        <span>nearest</span>
        {#if nearest.photo}
            <a href="/task/{nearest.id}" class="block">
                <img alt="Task" class="rounded-t w-full object-cover h-30" src={nearest.photo} />
            </a>
        {/if}
        <div class="p-2">
            <TaskComp bind:task={nearest}>
                <a href="/task/{nearest.id}" class="block mx-1 flex-grow {nearest.done ? 'line-through text-gray-400' : ''}"
                >
                    <span>{nearest.title}</span>
                </a>
                    {#if nearest.due_date}
                        <div class="text-xs text-gray-400">
                            {new Date(nearest.due_date).toLocaleString()}
                        </div>
                    {/if}
            </TaskComp>
            {#if nearest.description}
                <div class="p-2 text-gray-400">{nearest.description}</div>
            {/if}
        </div>
    </div>
{/if}

{#each tasks as task, i}
    {#if task.id !== nearest?.id}
        <div class="border rounded mt-2 p-2">
            <TaskComp bind:task={tasks[i]}>
                <a
                    href="/task/{task.id}"
                    class="block p-1 flex-grow {task.done ? 'line-through text-gray-400' : ''}"
                >
                    <div>{task.title}</div>
                </a>
                {#if task.due_date}
                    <div class="text-xs text-gray-400">
                        {new Date(task.due_date).toLocaleString()}
                    </div>
                {/if}
            </TaskComp>
        </div>
    {/if}
{/each}
