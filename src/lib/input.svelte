<script lang="ts">
    export type InputType = "text" | "textarea" | "file" | "search"
    type Props = {
        label?: string;
        class?: string;
        name?: string;
        value?: string;
        placeholder?: string;
        type?: InputType;
        onchange?: (e: Event) => void;
    };
    let {
        label,
        type = "text",
        name,
        placeholder,
        class: className,
        value = $bindable(),
        onchange,
    }: Props = $props();
</script>

<label class={className}>
    {#if label}
        <div>{label}</div>
    {/if}
    {#if type === "textarea"}
        <textarea class="w-100" {name} {placeholder} bind:value></textarea>
    {:else}
        <input class="w-100" {type} {name} {placeholder} bind:value onchange={onchange} />
    {/if}
</label>
