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
        <div>{label}</div>
    {/if}
    {#if type === "textarea"}
        <textarea class="w-full" {...rest} bind:value></textarea>
    {:else}
        <input class="w-full" {type} {...rest} bind:value />
    {/if}
</label>
