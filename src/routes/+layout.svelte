<script lang="ts">
    import "../app.css";
    import favicon from "$lib/assets/favicon.svg";
    import {Globe} from '@lucide/svelte'

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
        <a href="/" class="font-bold text-2xl flex items-center">
            <img alt="Favicon" src={favicon} />
            <span class="ml-3">Todo</span>
        </a>
        {time}
        <Globe />
    </header>

    <main class="flex-grow p-2 overflow-auto">
        {@render children?.()}
    </main>
</article>
