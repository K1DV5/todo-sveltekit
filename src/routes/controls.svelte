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
        <button title="Sort by title" onclick={() => onSetSort('title')} class={state.sort.by === 'title' ? 'text-red-400' : null}>
            {#if state.sort.ascending.title}
                <ArrowDownAZ />
            {:else}
                <ArrowUpAZ />
            {/if}
        </button>
        <button title="Sort by due time" onclick={() => onSetSort('due')} class={state.sort.by === 'due' ? 'text-red-400' : null}>
            {#if state.sort.ascending.due}
                <CalendarArrowDown />
            {:else}
                <CalendarArrowUp />
            {/if}
        </button>
    </div>
    <div class="mr-4">
        <button onclick={() => state.listView = true} class={state.listView ? 'text-red-400' : null}>
            <List />
        </button>
        <button onclick={() => state.listView = false} class={state.listView ? null : 'text-red-400'}>
            <Kanban />
        </button>
    </div>
    <a href="/task/new" title="New task" class="inline text-red-400">
        <SquarePlus />
    </a>
</nav>
