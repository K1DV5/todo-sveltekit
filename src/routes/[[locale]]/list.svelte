<script lang="ts">
    import { state as appState } from "$lib/state.svelte.js";
    import { sortFilterTasks } from "$lib/util";
    import Nearest from "$lib/nearest.svelte";
    import TaskItem from "$lib/task-item.svelte";
    import { flip } from "svelte/animate";

    let showLimit = $state(10)

    const tasks = $derived(
        sortFilterTasks(appState.tasks, appState.sort, appState.filter)
        .filter(([task]) => task.id !== appState.nearest?.id)
        .slice(0, showLimit)
    )

    function onAttach(node: HTMLDivElement) {
        const options = {
          rootMargin: "0px",
          scrollMargin: "0px",
          threshold: 1.0,
        };
        const observer = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting && tasks.length > showLimit) {
                showLimit += 10
            }
        }, options);
        observer.observe(node)
        return () => observer.disconnect()
    }

    const {locale}: {locale: string} = $props()

</script>

{#if appState.nearest?.title?.includes(appState.filter) && !appState.deletedIds.has(appState.nearest.id)}
    <div class="mt-2 text-gray-400">Nearest due task</div>
    <Nearest locale={locale} bind:task={appState.nearest} />
    <div class="border border-dashed mb-4"></div>
{/if}

{#each tasks as [task, i] (task.id)}
    <div animate:flip={{duration: 300}}>
        <TaskItem bind:task={appState.tasks[i]} locale={locale} />
    </div>
{/each}

<div {@attach onAttach}></div>
