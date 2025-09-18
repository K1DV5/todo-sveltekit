<script lang="ts">
    import Controls from "./controls.svelte";
    import type { PageProps } from "./$types";
    import List from "./list.svelte";
    import { state } from "$lib/state.svelte.js";

    const { data }: PageProps = $props();

    $effect(() => {
        state.tasks = data.tasks.filter(t => !state.deletedIds.has(t.id))
        if (state.deletedIds.has(data.nearest?.id)) {
            state.nearest = null
        } else {
            state.nearest = data.nearest
        }
    });

</script>

<svelte:head>
    <title>Todo</title>
</svelte:head>

<div class="h-full flex flex-col">
    <Controls />

    <div class="flex-grow overflow-auto">
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
</div>
