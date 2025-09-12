<script lang="ts">
    import Input from "$lib/input.svelte";
    import { state, type SortBy } from "$lib/state.svelte";
    import { List, Kanban, ArrowDownAZ, ArrowUpAZ, CalendarArrowDown, CalendarArrowUp, SquarePlus } from "@lucide/svelte";

    function onSetSort(by: SortBy) {
        if (state.sort.by === by) {
            state.sort.ascending[by] = !state.sort.ascending[by]
            return
        }
        state.sort.by = by
        state.sort.ascending[by] = by === 'title'
    }

</script>

<nav class="bg-gray-500 p-4 flex items-center justify-between">
    <Input type="search" bind:value={state.filter} placeholder="Type to search" class="flex-grow" />
    <div class="mx-4">
        <button title="Sort by title" onclick={() => onSetSort('title')}>
            {#if state.sort.ascending.title}
                <ArrowDownAZ />
            {:else}
                <ArrowUpAZ />
            {/if}
        </button>
        <button title="Sort by due time" onclick={() => onSetSort('due')}>
            {#if state.sort.ascending.due}
                <CalendarArrowDown />
            {:else}
                <CalendarArrowUp />
            {/if}
        </button>
    </div>
    <div class="mr-4">
        <button onclick={() => state.listView = true}><List /></button>
        <button onclick={() => state.listView = false}><Kanban /></button>
    </div>
    <a href="/task/new" title="New task" class="inline">
        <SquarePlus />
    </a>
</nav>
