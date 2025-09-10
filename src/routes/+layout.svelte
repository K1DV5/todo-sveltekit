<script lang="ts">
    import "../app.css";
    import favicon from "$lib/assets/favicon.svg";

    const getTime = () => new Date().toLocaleString(undefined, {dateStyle: 'medium', timeStyle: 'short'});
    let time = $state(getTime());
    $effect(() => {
        const interval = setInterval(() => {
            time = getTime();
        }, 60000);
        return () => clearInterval(interval);
    });

    let { children } = $props();
</script>

<svelte:head>
    <link rel="icon" href={favicon} />
</svelte:head>

<article class="h-full flex flex-col">
    <header class="flex justify-between items-center p-2 bg-green-700">
        <a href="/" class="font-bold text-2xl">Todo</a>
        {time}
        <a href="/task/new">New</a>
    </header>

    <main class="flex-grow p-2 overflow-auto">
        {@render children?.()}
    </main>
</article>
