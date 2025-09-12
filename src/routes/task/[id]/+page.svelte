<script lang="ts">
    import Editable, { type EditableField } from "$lib/editable.svelte";
    import Task from "$lib/task.svelte";
    import { Delete, Trash2 } from "@lucide/svelte";
    import type { PageProps } from "./$types";

    const { data }: PageProps = $props();
    let task = $state(data.task)

    async function onDelete() {
        history.back();
        await fetch(`/api/tasks/${task.id}`, { method: "DELETE" });
    }

    let editing: EditableField | null = $state(null);
</script>

<svelte:head>
    <title>{data.task.title}</title>
</svelte:head>

<Editable bind:editing bind:task={task} field="title">
    <Task bind:task={task}>
        <div class="p-1 flex-grow {task.done ? 'line-through text-gray-400' : ''}">
            {task.title}
        </div>
    </Task>
</Editable>

<Editable bind:editing bind:task={task} field="photo">
    {#if task.photo}
        <img alt="Attachment" src={task.photo} />
    {:else}
        <p class="text-sm text-gray-400">(No photo)</p>
    {/if}
</Editable>

<Editable bind:editing bind:task={task} field="description">
    {#if task.description}
        <p>
            {task.description}
        </p>
    {:else}
        <p class="text-sm text-gray-400">(No description)</p>
    {/if}
</Editable>

<Editable bind:editing bind:task={task} field="due_date">
    {#if task.due_date}
        <p>
            {new Date(task.due_date)}
        </p>
    {:else}
        <p class="text-sm text-gray-400">(No sue date)</p>
    {/if}
</Editable>

<button onclick={() => onDelete()}><Trash2 /></button>
