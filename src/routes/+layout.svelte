<script lang="ts">
	import '../app.css';
	import favicon from '$lib/assets/favicon.svg';
	
	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<header class="flex justify-between p-2">
    <a href="/">Todo App</a>
    {new Date().toLocaleString()}
    <a href="/task/new">New</a>
</header>

{@render children?.()}
