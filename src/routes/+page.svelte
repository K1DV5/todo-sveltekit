<script lang="ts">
    import Controls from "./controls.svelte";
    import type { PageProps } from "./$types";
    import List from "./list.svelte";
    import { state } from "$lib/state.svelte.js";
    import { fade } from "svelte/transition";

    const { data }: PageProps = $props();

    $effect(() => {
        state.tasks = data?.tasks?.filter(t => !state.deletedIds.has(t.id)) ?? []
        if (state.deletedIds.has(data?.nearest?.id)) {
            state.nearest = null
        } else {
            state.nearest = data?.nearest
        }
    });

</script>

<svelte:head>
    <title>Todo</title>
</svelte:head>

<div class="h-full flex flex-col">
    <Controls />

    <div class="flex-grow relative">
        {#key state.listView}
            <div
                class="absolute inset-0 overflow-auto"
                in:fade={{duration: 300, delay: 150}}
                out:fade={{duration: 150}}
            >
                {#if state.listView}
                    <List />
                {:else}
                    {#await import('./kanban.svelte')}
                        Loading Kanban...
                        {:then {default: Kanban}} 
                        <Kanban />
                    {/await}
                {/if}
            </div>
        {/key}
    </div>
</div>
