<script lang="ts">
    import { getSortedFilteredTasks, state } from "./state.svelte";
    import TaskComp from "./task.svelte";
    import type {Task} from "./types.js";

    const sortedTasks = $derived(getSortedFilteredTasks())
    const {title, check}: {title: string, check: (task: Task) => boolean} = $props()
</script>

<div class="p-4 m-3 border flex-grow">
    <div>{title}</div>
    {#each sortedTasks as [task, i]}
        {#if check(task as Task)}
            <TaskComp bind:task={state.tasks[i]}>
                {task.title}
            </TaskComp>
        {/if}
    {/each}
</div>
