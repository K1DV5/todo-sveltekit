<script lang="ts">
    import { state } from "./state.svelte";
    import { sortFilterTasks } from "./util";
    import TaskComp from "./task.svelte";
    import type {Task} from "./types.js";

    const tasks = $derived(sortFilterTasks(state.tasks, state.sort, state.filter))

    const {title, check}: {title: string, check: (task: Task) => boolean} = $props()
</script>

<div class="p-4 m-3 border flex-grow">
    <div>{title}</div>
    {#each tasks as [task, i]}
        {#if check(task as Task)}
            <TaskComp bind:task={state.tasks[i]}>
                {task.title}
            </TaskComp>
        {/if}
    {/each}
</div>
