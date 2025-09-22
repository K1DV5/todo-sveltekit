<script lang="ts">
    import { Globe } from "@lucide/svelte";
    import { locales } from "virtual:wuchale/locales";

    const {locale}: {locale: string} = $props()

    let show = $state(false)
    function onAttach(node: HTMLButtonElement) {
        const listener = (e: MouseEvent) => {
            if (node.contains(e.target as Node)) {
                return
            }
            show = false
        }
        window.addEventListener('click', listener)
        return () => {
            window.removeEventListener('click', listener)
        }
    }

</script>

<div class="p-4 relative group">
    <button class="flex" onclick={() => {show = !show}} {@attach onAttach}>
        <Globe />
        <div class="ml-1">{locale?.toUpperCase()}</div>
    </button>
    <div class="absolute right-4 p-4 border rounded-xl border-gray-400 bg-white {show ? '' : 'hidden'}">
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
