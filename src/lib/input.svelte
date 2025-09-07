<script lang="ts">
    type Props = {
        label: string;
        name?: string;
        value?: string
        type?: 'text' | 'textarea' | 'file';
    };
    let { label, type = 'text', name, value = $bindable() }: Props = $props();
</script>

{#if type === 'textarea'}
<label>
    <div>{label}</div>
    <textarea {name} bind:value={value}></textarea>
</label>
{:else}
<label>
    <div>{label}</div>
    <input {type} {name} bind:value={value} />
</label>
{/if}
