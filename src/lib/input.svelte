<script lang="ts">
    export type InputType = "text" | "textarea" | "file" | "search"
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
        <textarea class="w-100" {...rest} bind:value></textarea>
    {:else}
        <input class="w-100" {type} {...rest} bind:value />
    {/if}
</label>
