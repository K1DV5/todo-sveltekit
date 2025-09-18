<script lang="ts">
    import { X } from "@lucide/svelte";
    type Props = {
        label?: string;
        value?: string;
    };
    let {
        label,
        class: className,
        value = $bindable(),
        ...rest
    }: Props & { [key: string]: any } = $props();

    let currentSelected: string | null = $state(null);
    let node: HTMLInputElement | null = null;

    function onChange() {
        const file = node?.files?.[0] as File;
        if (file?.size) {
            currentSelected = URL.createObjectURL(file);
        }
    }

    function onClear(e: Event) {
        e.preventDefault();
        if (node) {
            node.value = "";
        }
        currentSelected = "";
    }

    let hovering = $state(false)

    function onDragOver(e: DragEvent) {
        hovering = true
        e.preventDefault();
        if (e.dataTransfer) {
            e.dataTransfer.dropEffect = "copy";
        }
    }

    function onDragLeave() {
        hovering = false
    }

    function onDrop(e: DragEvent) {
        e.preventDefault();
        hovering = false
        const file = e.dataTransfer?.files?.[0];
        if (!file || !node) {
            return;
        }
        node.files = e.dataTransfer.files;
        currentSelected = URL.createObjectURL(file);
    }

    let previewUrl = $derived(currentSelected ?? value);
</script>

<div class="relative">
    {#if previewUrl}
        <button
            type="button"
            class="absolute right-2 {label ? 'top-8' : 'top-4'} p-2 rounded border"
            onclick={onClear}
        >
            <X />
        </button>
    {/if}
    <label class={className}>
        {#if label}
            <div class="text-gray-400">{label}</div>
        {/if}
        <div
            class="border cursor-pointer rounded border-dashed p-4 hover:border-blue-400 {hovering ? 'border-blue-400' : ''}"
            role="application"
            ondrop={onDrop}
            ondragover={onDragOver}
            ondragleave={onDragLeave}
        >
            {#if previewUrl}
                <img class="w-full" src={previewUrl} alt="Current value" />
            {:else}
                Click to select photo or drop here
            {/if}
        </div>
        <input
            class="hidden"
            type="file"
            accept="image/*"
            {...rest}
            onchange={onChange}
            {@attach (n) => { node = n }}
        />
    </label>
</div>
