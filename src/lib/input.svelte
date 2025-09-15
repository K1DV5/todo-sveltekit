<script lang="ts">
    export type InputType = "text" | "textarea" | "file" | "search" | 'datetime-local'
    type Props = {
        label?: string;
        class?: string;
        value?: string;
        type?: InputType;
    };
    let {
        label,
        type = "text",
        class: className,
        value = $bindable(),
        ...rest
    }: Props & {[key: string]: any} = $props();
</script>

<label class={className}>
    {#if label}
        <div class="text-gray-400">{label}</div>
    {/if}
    {#if type === "textarea"}
        <textarea class="w-full rounded field-sizing-content" {...rest} bind:value></textarea>
    {:else}
        <input class="w-full rounded" {type} {...rest} bind:value />
    {/if}
</label>
