<script lang="ts">
    import Editable, { type EditableField } from "$lib/editable.svelte";
    import Task from "$lib/task.svelte";
    import { Trash2 } from "@lucide/svelte";
    import type { PageProps } from "./$types";
    import { state as globalState } from "$lib/state.svelte.js";

    const { data }: PageProps = $props();
    let task = $state(data.task);

    async function onDelete() {
        globalState.tasks = globalState.tasks.filter(t => t.id !== task.id)
        history.back();
        await fetch(`/api/tasks/${task.id}`, { method: "DELETE" });
    }

    let editing: EditableField | null = $state(null);

</script>

<svelte:head>
    <title>{data.task.title}</title>
</svelte:head>

<Task bind:task>
    <Editable bind:editing bind:task field="title">
        <div
            class="p-1 flex-grow {task.done
                ? 'line-through text-gray-400'
                : ''}"
        >
            {task.title}
        </div>
    </Editable>
</Task>

<Editable bind:editing bind:task field="photo">
    {#if task.photo}
        <img alt="Attachment" src={task.photo} />
    {:else}
        <p class="text-sm text-gray-400">(No photo)</p>
    {/if}
</Editable>

<Editable bind:editing bind:task field="description">
    {#if task.description}
        <p>
            {task.description}
        </p>
    {:else}
        <p class="text-sm text-gray-400">(No description)</p>
    {/if}
</Editable>

<Editable bind:editing bind:task field="due_date">
    {#if task.due_date}
        <p>
            {new Date(task.due_date).toLocaleString()}
        </p>
    {:else}
        <p class="text-sm text-gray-400">(No sue date)</p>
    {/if}
</Editable>

<div class="text-gray-400 text-sm">
    <div>Created {new Date(task.created_at).toLocaleString()}</div>
    {#if task.edited_at}
        <div>Edited {new Date(task.created_at).toLocaleString()}</div>
    {/if}
</div>

<button onclick={() => onDelete()}><Trash2 /></button>
