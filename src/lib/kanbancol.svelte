<script lang="ts">
    import { state } from "./state.svelte";
    import { sortFilterTasks } from "./util";
    import type { Task } from "./types.js";
    import TaskItem from "./task-item.svelte";
    import Nearest from "./nearest.svelte";
    import { receiveKanban, sendKanban } from "./animate";
    import { flip } from "svelte/animate"

    const tasks = $derived(
        sortFilterTasks(state.tasks, state.sort, state.filter)
            .filter(([task]) => check(task)),
    );

    type Props = {
        title: string
        check: (task: Task) => boolean
        locale: string
    }

    const { title, check, locale }: Props = $props();

</script>

<div class="p-4 m-3 bg-gray-400/5 rounded-lg flex-grow basis-40">
    <div>{title}</div>
    {#each tasks as [task, i] (task.id)}
        <div
            in:receiveKanban={{key: task.id}}
            out:sendKanban={{key: task.id}}
            animate:flip={{duration: 300}}
        >
            {#if task.id === state.nearest?.id}
                <Nearest locale={locale} bind:task={state.tasks[i]} />
            {:else}
                <TaskItem locale={locale} bind:task={state.tasks[i]} />
            {/if}
        </div>
    {/each}
</div>
