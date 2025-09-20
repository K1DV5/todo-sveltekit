<script lang="ts">
    import "../app.css";
    import favicon from "$lib/assets/favicon.svg";
    import { Ban, CircleCheckBig, Globe, Loader } from "@lucide/svelte";
    import { state as appState } from "$lib/state.svelte";
    import Confirm from "$lib/confirm.svelte";
    import type { LayoutProps } from "./$types";

    const locales = ['en', 'cs']

    const getTime = () =>
        new Date().toLocaleString(undefined, {
            dateStyle: "medium",
            timeStyle: "short",
        });
    let time = $state(getTime());
    $effect(() => {
        const interval = setInterval(() => {
            time = getTime();
        }, 60000);
        return () => clearInterval(interval);
    });

    $effect(() => {
        if (!appState.alert) {
            return
        }
        setTimeout(() => {appState.alert = undefined}, 3000)
    })

    let { children, data }: LayoutProps = $props();
</script>

<svelte:head>
    <link rel="icon" href={favicon} />
</svelte:head>

<div class="h-full flex flex-col items-center p-2">
    <div class="h-full flex flex-col w-[min(100%,50rem)]">
        <header class="rounded-lg flex justify-between items-center bg-blue-500 shadow-xl text-white">
            <a href="/{data.locale}" class="font-bold p-4 text-2xl flex items-center">
                <img alt="Favicon" src={favicon} />
                <span class="ml-3">Todo</span>
            </a>
            {time}
            <div class="p-4 relative group">
                <div class="flex">
                    <Globe />
                    <div class="ml-1">{data.locale?.toUpperCase()}</div>
                </div>
                <div class="absolute right-4 p-4 border rounded-xl border-gray-400 bg-white hidden group-hover:block">
                    {#each locales as locale}
                        <a
                            class="block py-1 hover:text-blue-500 cursor-pointer"
                            data-sveltekit-preload-data="off"
                            href="/{locale}"
                        >
                            {new Intl.DisplayNames([locale], { type: "language" }).of(locale)}
                        </a>
                    {/each}
                </div>
            </div>
        </header>

        <main class="mt-1 flex-grow p-2 overflow-auto">
            {@render children?.()}
        </main>
    </div>
    {#if appState.alert}
        <div class="absolute bottom-4 left-4 right-0 flex justify-center">
            <div class="text-white p-4 shadow-xl rounded-lg border flex {appState.alert.type === 'error' ? 'bg-red-400' : 'bg-green-500'}">
            {#if appState.alert.type === 'success'}
                <CircleCheckBig />
            {:else}
                <Ban />
            {/if}
            <div>
                {#each appState.alert.message.split('\n') as line}
                    <div class="ml-2">{line}</div>
                {/each}
            </div>
            </div>
        </div>
    {/if}
    {#if appState.loading}
        <div class="absolute bottom-4 right-4 p-2 text-white bg-blue-500 rounded-[50%] animate-spin">
            <Loader />
        </div>
    {/if}
    <Confirm />
</div>
