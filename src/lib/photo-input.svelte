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

    function onDragOver(e: DragEvent) {
        e.preventDefault();
        if (e.dataTransfer) {
            e.dataTransfer.dropEffect = "copy";
        }
    }

    function onDrop(e: DragEvent) {
        e.preventDefault();
        const file = e.dataTransfer?.files?.[0];
        if (!file || !node) {
            return;
        }
        node.files = e.dataTransfer.files;
        currentSelected = URL.createObjectURL(file);
    }

    let previewUrl = $derived(currentSelected ?? value);
</script>

<label class={className}>
    {#if label}
        <div>{label}</div>
    {/if}
    <div
        class="border w-full rounded border p-4 relative"
        role="application"
        ondrop={onDrop}
        ondragover={onDragOver}
    >
        {#if previewUrl}
            <button type="button" class="absolute right-4" onclick={onClear}>
                <X />
            </button>
            <img class="w-full" src={previewUrl} alt="Current value" />
        {:else}
            Click to select photo or drop here
        {/if}
    </div>
    <input
        class="hidden"
        type="file"
        {...rest}
        {@attach (n) => {
            node = n;
        }}
        onchange={onChange}
    />
</label>
