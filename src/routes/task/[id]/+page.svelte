<script lang="ts">
    import Editable, { type EditableField } from "$lib/editable.svelte";
    import Task from "$lib/task.svelte";
    import { Trash2 } from "@lucide/svelte";
    import type { PageProps } from "./$types";
    import { state as globalState } from "$lib/state.svelte.js";
    import { goto } from "$app/navigation";

    const { data }: PageProps = $props();
    let task = $state(data.task);

    async function onDelete() {
        globalState.tasks = globalState.tasks.filter(t => t.id !== task.id)
        // const index = globalState.tasks.findIndex(t => t.id === task.id)
        // if (index != null) {
        //     globalState.tasks.splice(index, 1)
        // }
        goto('/')
        fetch(`/api/tasks/${task.id}`, { method: "DELETE" }).then(console.log);
    }

    let editing: EditableField | null = $state(null);

</script>

<svelte:head>
    <title>{data.task.title}</title>
</svelte:head>

<div class="flex w-full">
    <div class="flex-grow">
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
    </div>
    <button onclick={() => onDelete()}><Trash2 /></button>
</div>

<div class="flex w-full">
    <div class="flex-grow">
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
                <p class="text-sm text-gray-400">(No due date)</p>
            {/if}
        </Editable>
        <div class="text-gray-400 text-sm">
            <div>Created {new Date(task.created_at).toLocaleString()}</div>
            {#if task.edited_at}
                <div>Edited {new Date(task.created_at).toLocaleString()}</div>
            {/if}
        </div>
    </div>
    <div class="flex-grow flex basis-1/3 p-4">
        <Editable bind:editing bind:task field="photo">
            {#if task.photo}
                <img class="rounded w-full" alt="Attachment" src={task.photo} />
            {:else}
                <div class="rounded border w-full text-sm text-gray-400 p-4">(No photo)</div>
            {/if}
        </Editable>
    </div>
</div>
