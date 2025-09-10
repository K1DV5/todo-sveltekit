<script lang="ts">
    import type {Task} from "$lib/types";
    import TaskComp from "$lib/task.svelte";

    const {nearest, tasks}: { nearest: Task, tasks: Task[] } = $props();

</script>

{#each tasks.filter((t) => t.id !== nearest.id) as task}
    <TaskComp {task}>
        <a href="/task/{task.id}" class="p-1">
            {task.title}
        </a>
    </TaskComp>
{/each}
