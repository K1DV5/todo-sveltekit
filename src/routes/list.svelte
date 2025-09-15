<script lang="ts">
    import TaskComp from "$lib/task.svelte";
    import { state as appState } from "$lib/state.svelte.js";
    import { sortFilterTasks } from "$lib/util";
    import Nearest from "$lib/nearest.svelte";
    import TaskItem from "$lib/task-item.svelte";

    const tasks = $derived(sortFilterTasks(appState.tasks, appState.sort, appState.filter))

    let showLimit = $state(10)

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

</script>

{#if appState.nearest?.title?.includes(appState.filter)}
    <div class="mt-2 text-gray-400">Nearest due task</div>
    <Nearest bind:task={appState.nearest} />
    <div class="border border-dashed mb-4"></div>
{/if}

{#each tasks as [task, i], showI}
    {#if task.id !== appState.nearest?.id && showI < showLimit}
        <TaskItem bind:task={appState.tasks[i]} />
    {/if}
{/each}

<div {@attach onAttach}></div>
