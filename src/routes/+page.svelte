<script lang="ts">
    import Controls from "./controls.svelte";
    import type { PageProps } from "./$types";
    import List from "./list.svelte";
    import Kanban from "./kanban.svelte";
    const { data }: PageProps = $props();

    let listView = $state(globalThis.window?.location?.hash !== "#kanban");
    $effect(() => {
        const listener = () => {
            listView = globalThis.window?.location?.hash !== "#kanban";
        };
        window.addEventListener("hashchange", listener);
        return () => window.removeEventListener("hashchange", listener);
    });
</script>

<svelte:head>
    <title>Todo</title>
</svelte:head>

<div class="h-full flex flex-col">
    <Controls />

    <div class="flex-grow overflow-auto">
        {#if listView}
            <List nearest={data.nearest} tasks={data.tasks} />
        {:else}
            <Kanban nearest={data.nearest} tasks={data.tasks} />
        {/if}
    </div>
</div>
