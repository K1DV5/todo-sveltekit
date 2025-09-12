<script lang="ts">
    import TaskComp from "$lib/task.svelte";
    import { state } from "$lib/state.svelte.js";
    import type { Task } from "$lib/types";

    const sortedTasks = $derived(state.tasks
        .map((task, i) => [task, i] as [Task, number])
        .sort(([t1], [t2]) => {
            if (state.sort.by === 'title') {
                if (state.sort.ascending.title) {
                    return t1.title < t2.title ? -1 : 1
                }
                return t1.title > t2.title ? -1 : 1
            }
            if (!t1.due_date || !t2.due_date) {
                return 0
            }
            const due1 = Date.parse(t1.due_date as string)
            const due2 = Date.parse(t2.due_date as string)
            if (state.sort.ascending.due) {
                return due1 < due2 ? -1 : 1
            }
            return due1 > due2 ? -1 : 1
        })
    )

</script>

{#if state.nearest?.title?.includes(state.filter)}
    <div class="border rounded my-4 relative">
        <span>nearest</span>
        {#if state.nearest.photo}
            <a href="/task/{state.nearest.id}" class="block">
                <img alt="Task" class="rounded-t w-full object-cover h-30" src={state.nearest.photo} />
            </a>
        {/if}
        <div class="p-2">
            <TaskComp bind:task={state.nearest}>
                <a href="/task/{state.nearest.id}" class="block mx-1 flex-grow {state.nearest.done ? 'line-through text-gray-400' : ''}"
                >
                    <span>{state.nearest.title}</span>
                </a>
                    {#if state.nearest.due_date}
                        <div class="text-xs text-gray-400">
                            {new Date(state.nearest.due_date).toLocaleString()}
                        </div>
                    {/if}
            </TaskComp>
            {#if state.nearest.description}
                <div class="p-2 text-gray-400">{state.nearest.description}</div>
            {/if}
        </div>
    </div>
{/if}

{#each sortedTasks as [task, i]}
    {#if task.id !== state.nearest?.id && task.title.includes(state.filter)}
        <div class="border rounded mt-2 p-2">
            <TaskComp bind:task={state.tasks[i]}>
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
