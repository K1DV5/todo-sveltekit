<script lang="ts">
    import Controls from "./controls.svelte";
    import type { PageProps } from "./$types";
    import Task from "$lib/task.svelte";
    const {data}: PageProps = $props()
</script>

<svelte:head>
    <title>Todo App</title>
</svelte:head>

<article class="flex">

    <nav class="basis-1/3 bg-red p-2">
        <Controls />
    </nav>

    <main class="p-2">
        {#if data.nearest}
            <div class="p-2">
                <Task task={data.nearest}>
                    <a href="/task/{data.nearest.id}">{data.nearest.title}</a>
                </Task>
                {#if data.nearest.due_date}
                    <div class="p-2">{new Date(data.nearest.due_date)}</div>
                {/if}
                {#if data.nearest.photo}
                    <img alt="Task" src="/photos/{data.nearest.photo}" />
                {/if}
                <div class="p-2">{data.nearest.description}</div>
            </div>
        {/if}
        {#each data.tasks.filter(t => t.id !== data.nearest.id) as task}
            <Task task={task}>
                <a href="/task/{task.id}" class="p-1">
                    {task.title}
                </a>
            </Task>
        {/each}
    </main>

</article>
