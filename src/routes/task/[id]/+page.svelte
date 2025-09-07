<script lang="ts">
    import Task from "$lib/task.svelte";
    import type { PageProps } from "./$types";

    const {data}: PageProps = $props()
    async function onDelete() {
        await fetch(`/api/tasks/${data.task.id}`, {method: 'DELETE'})
        history.back()
    }

</script>

<svelte:head>
    <title>{data.task.title}</title>
</svelte:head>

<Task task={data.task}>{data.task.title}</Task>

<p>
    {data.task.description}
</p>

{#if data.task.due_date}
    <p>
        {new Date(data.task.due_date)}
    </p>
{/if}

<button onclick={() => onDelete()}>Delete</button>
