<script lang="ts">
    import Kanbancol from "$lib/kanbancol.svelte";
</script>

<div class="flex">
    <Kanbancol title="Pending" check={task => !task.done} />
    <Kanbancol title="Done" check={task => task.done} />
</div>
