<script lang="ts">
    import Editable, { type EditableField } from "$lib/editable.svelte";
    import Task from "$lib/task.svelte";
    import { Trash2 } from "@lucide/svelte";
    import type { PageProps } from "./$types";
    import { state as appState } from "$lib/state.svelte.js";
    import { goto } from "$app/navigation";
    import { confirm } from "$lib/confirm.svelte";

    const { data }: PageProps = $props();
    let task = $state(data.task);

    async function deleteTask() {
        appState.deletedIds.add(task.id)
        appState.loading = true
        const res = await fetch(`/api/tasks/${task.id}`, { method: "DELETE" })
        appState.loading = false
        if (res.ok) {
            appState.alert = {
                type: 'success',
                message: 'Successfully deleted task',
            }
            return
        }
        const data: {message: string} = await res.json()
        appState.alert = {
            type: 'error',
            message: data.message
        }
    }

    function onDelete() {
        confirm('Do you really want to delete this task?').then(ans => {
            if (!ans) {
                return
            }
            deleteTask()
            goto('/')
        })
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
                <h1
                    class="p-4 pl-0 font-bold flex-grow {task.done
                        ? 'line-through text-gray-400'
                        : ''}"
                >
                    {task.title}
                </h1>
            </Editable>
        </Task>
    </div>
    <button class="text-red-400 cursor-pointer p-4 hover:bg-red-400/20 rounded-xl" onclick={onDelete}><Trash2 /></button>
</div>

<div class="flex w-full flex-wrap">
    <div class="flex-grow">
        <Editable bind:editing bind:task field="description">
            {#if task.description}
                <div class="rounded">
                    {#each task.description.replace(/\r/g, '').split('\n\n') as para}
                        <p class="p-2">{para}</p>
                    {/each}
                </div>
            {:else}
                <p class="text-sm text-gray-400 rounded p-2">(No description)</p>
            {/if}
        </Editable>

        <Editable bind:editing bind:task field="due_date">
            {#if task.due_date}
                <p class="rounded p-2">
                    <span class="text-gray-400">Due on:</span> {new Date(task.due_date).toLocaleString()}
                </p>
            {:else}
                <p class="text-sm text-gray-400 rounded p-2">(No due date)</p>
            {/if}
        </Editable>

        <div class="text-gray-400 rounded p-2 text-sm">
            <div>Created {new Date(task.created_at).toLocaleString()}</div>
            {#if task.edited_at}
                <div>Edited {new Date(task.created_at).toLocaleString()}</div>
            {/if}
        </div>
    </div>
    <div class="flex basis-70">
        <Editable bind:editing bind:task field="photo">
            {#if task.photo}
                <img class="rounded w-full p-4" alt="Attachment" src={task.photo} />
            {:else}
                <div class="rounded border w-full text-sm text-gray-400 p-4">(No photo)</div>
            {/if}
        </Editable>
    </div>
</div>
