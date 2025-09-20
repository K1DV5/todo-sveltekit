<script lang="ts">
    import Input from "$lib/input.svelte";
    import { state } from "$lib/state.svelte";
    import type { SortBy } from "$lib/types";
    import {
        List,
        Kanban,
        ArrowDownAZ,
        ArrowUpAZ,
        CalendarArrowDown,
        CalendarArrowUp,
        SquarePlus,
    } from "@lucide/svelte";

    function onSetSort(by: SortBy) {
        if (state.sort.by === by) {
            state.sort.ascending[by] = !state.sort.ascending[by];
            return;
        }
        state.sort.by = by;
        state.sort.ascending[by] = by === "title";
    }

    const {locale}: {locale: string} = $props()

</script>

<nav class="bg-gray-400/30 p-4 rounded-xl flex items-start">
    <div class="flex items-center justify-around flex-wrap flex-grow">
        <Input
            type="search"
            bind:value={state.filter}
            placeholder="Type to search"
            class="flex-grow"
        />
        <div class="basis-40 flex ml-10 mt-2">
            <div class="mx-4">
                <button
                    title="Sort by title"
                    onclick={() => onSetSort("title")}
                    class="cursor-pointer {state.sort.by === 'title'
                        ? 'text-blue-500'
                        : 'text-gray-600'}"
                >
                    {#if state.sort.ascending.title}
                        <ArrowDownAZ />
                    {:else}
                        <ArrowUpAZ />
                    {/if}
                </button>
                <button
                    title="Sort by due time"
                    onclick={() => onSetSort("due")}
                    class="cursor-pointer {state.sort.by === 'due'
                        ? 'text-blue-500'
                        : 'text-gray-600'}"
                >
                    {#if state.sort.ascending.due}
                        <CalendarArrowDown />
                    {:else}
                        <CalendarArrowUp />
                    {/if}
                </button>
            </div>
            <div class="mr-4">
                <button
                    onclick={() => (state.listView = true)}
                    class="cursor-pointer {state.listView
                        ? 'text-blue-500'
                        : 'text-gray-600'}"
                >
                    <List />
                </button>
                <button
                    onclick={() => (state.listView = false)}
                    class="cursor-pointer {state.listView
                        ? 'text-gray-600'
                        : 'text-blue-500'}"
                >
                    <Kanban />
                </button>
            </div>
        </div>
    </div>
    <a
        href="/{locale}/task/new"
        title="New task"
        class="inline bg-blue-500 text-white rounded-xl p-2 ml-2 cursor-pointer"
    >
        <SquarePlus />
    </a>
</nav>
