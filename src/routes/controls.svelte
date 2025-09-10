<script lang="ts">
    import Input from "$lib/input.svelte";

</script>

<nav class="bg-gray-500 bg-opacity-20 p-4 flex items-center justify-between">
    <Input type="search" placeholder="Type to search" />
    <div>
        <a href="#list">List</a>
        <a href="#kanban">Kanban</a>
    </div>
</nav>
