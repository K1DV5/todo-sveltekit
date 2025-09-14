<script lang="ts">
    import TaskComp from "$lib/task.svelte";
    import { state as appState } from "$lib/state.svelte.js";
    import { sortFilterTasks } from "$lib/util";

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
    <div class="border rounded my-4 relative">
        <span>nearest</span>
        {#if appState.nearest.photo}
            <a href="/task/{appState.nearest.id}" class="block">
                <img alt="Task" class="rounded-t w-full object-cover h-30" src={appState.nearest.photo} />
            </a>
        {/if}
        <div class="p-2">
            <TaskComp bind:task={appState.nearest}>
                <a href="/task/{appState.nearest.id}" class="block mx-1 flex-grow {appState.nearest.done ? 'line-through text-gray-400' : ''}"
                >
                    <span>{appState.nearest.title}</span>
                </a>
                    {#if appState.nearest.due_date}
                        <div class="text-xs text-gray-400">
                            {new Date(appState.nearest.due_date).toLocaleString()}
                        </div>
                    {/if}
            </TaskComp>
            {#if appState.nearest.description}
                <div class="p-2 text-gray-400">{appState.nearest.description}</div>
            {/if}
        </div>
    </div>
{/if}

{#each tasks as [task, i], showI}
    {#if task.id !== appState.nearest?.id && showI < showLimit}
        <div class="border rounded mt-2 p-2">
            <TaskComp bind:task={appState.tasks[i]}>
                <a
                    href="/task/{task.id}"
                    class="block p-1 flex-grow {task.done ? 'line-through text-gray-400' : ''}"
                >
                    <div>{task.title}</div>
                </a>
                {#if task.due_date}
                    <div class="text-xs text-gray-400">
                        {new Date(task.due_date).toLocaleString()}
                    </div>
                {/if}
            </TaskComp>
        </div>
    {/if}
{/each}

<div {@attach onAttach}></div>
