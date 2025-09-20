<script lang="ts">
    import Kanbancol from "$lib/kanbancol.svelte";
    const {locale}: {locale: string} = $props()
</script>

<div class="flex flex-wrap">
    <Kanbancol {locale} title="Pending" check={task => !task.done} />
    <Kanbancol {locale} title="Done" check={task => task.done} />
</div>
