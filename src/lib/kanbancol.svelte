<script lang="ts">
    import { state } from "./state.svelte";
    import { sortFilterTasks } from "./util";
    import type { Task } from "./types.js";
    import TaskItem from "./task-item.svelte";
    import Nearest from "./nearest.svelte";

    const tasks = $derived(
        sortFilterTasks(state.tasks, state.sort, state.filter),
    );

    const { title, check }: { title: string; check: (task: Task) => boolean } =
        $props();
</script>

<div class="p-4 m-3 bg-gray-400/5 rounded-lg flex-grow basis-40">
    <div>{title}</div>
    {#each tasks as [task, i]}
        {#if check(task as Task)}
            {#if task.id === state.nearest?.id}
                <Nearest bind:task={state.tasks[i]} />
            {:else}
                <TaskItem bind:task={state.tasks[i]} />
            {/if}
        {/if}
    {/each}
</div>
