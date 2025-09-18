<script lang="ts">
	import { page } from '$app/state';
    import { Ban } from '@lucide/svelte';
</script>

<div class="w-full h-full flex flex-col justify-center items-center">
    <div class="text-red-400">
        <Ban />
    </div>
    <h1 class="text-3xl font-bold mb-3">{page.status}</h1>
    <p class="text-red-400">{page.error?.message}</p>
</div>
