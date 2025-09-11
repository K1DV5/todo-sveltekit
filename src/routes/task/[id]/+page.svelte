<script lang="ts">
    import Editable, { type EditableField } from "$lib/editable.svelte";
    import Task from "$lib/task.svelte";
    import type { PageProps } from "./$types";

    const { data }: PageProps = $props();

    async function onDelete() {
        await fetch(`/api/tasks/${data.task.id}`, { method: "DELETE" });
        history.back();
    }

    let editing: EditableField | null = $state(null);
</script>

<svelte:head>
    <title>{data.task.title}</title>
</svelte:head>

<Editable bind:editing task={data.task} field="title">
    <Task task={data.task}>
        {data.task.title}
    </Task>
</Editable>

<Editable bind:editing task={data.task} field="photo">
    {#if data.task.photo}
        <img alt="Attachment" src={data.task.photo} />
    {:else}
        <p class="text-sm text-gray-400">(No photo)</p>
    {/if}
</Editable>

<Editable bind:editing task={data.task} field="description">
    {#if data.task.description}
        <p>
            {data.task.description}
        </p>
    {:else}
        <p class="text-sm text-gray-400">(No description)</p>
    {/if}
</Editable>

<Editable bind:editing task={data.task} field="due_date">
    {#if data.task.due_date}
        <p>
            {new Date(data.task.due_date)}
        </p>
    {:else}
        <p class="text-sm text-gray-400">(No sue date)</p>
    {/if}
</Editable>

<button onclick={() => onDelete()}>Delete</button>
