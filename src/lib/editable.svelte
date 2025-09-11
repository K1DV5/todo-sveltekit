<script lang="ts">
    import { invalidate } from "$app/navigation";
    import Input, { type InputType } from "./input.svelte";
    import type { Task } from "./types";

    export type EditableField = "title" | "description" | "due_date" | "photo";

    let {
        task,
        field,
        editing = $bindable(),
        children,
    }: {
        task: Task;
        field: EditableField;
        editing: EditableField | null;
        children: any;
    } = $props();

    const typeByField: Record<EditableField, InputType> = {
        title: "text",
        description: "textarea",
        due_date: "text",
        photo: "file",
    };

    let removePhoto = $state(false);

    async function onEdit(form: HTMLFormElement) {
        editing = null;
        const fdata = new FormData(form);
        if (field === 'photo' && removePhoto) {
            fdata.set('photo', new File([], ''))
        }
        const value = fdata.get(field);
        if (field === 'photo') {
            const file = value as File
            if (file.size) {
                task[field] = URL.createObjectURL(file)
            } else {
                task[field] = undefined
            }
        } else {
            task[field] = value as string;
        }
        await fetch(`/api/tasks/${task.id}`, { method: "PUT", body: fdata });
        invalidate(`/task/${task.id}`);
    }

    let blobUrl = $state('')
</script>

{#if editing === field}
    <form
        onsubmit={(e) => {
            e.preventDefault();
            onEdit((e as SubmitEvent).target as HTMLFormElement);
        }}
    >
        {#if field === "photo"}
            <label>
                {#if removePhoto || !blobUrl && !task.photo}
                    Select
                {:else}
                    <img alt="Existing" src={blobUrl || task.photo} />
                {/if}
                <Input class="hidden" name={field} type="file" onchange={(e) => {
                    removePhoto = false
                    const file = (e.target as HTMLInputElement).files?.[0]
                    if (file) {
                        blobUrl = URL.createObjectURL(file)
                    }
                }} />
                <button
                    type="button"
                    onclick={() => {
                        removePhoto = true;
                    }}>Remove</button
                >
            </label>
        {:else}
            <Input name={field} type={typeByField[field]} value={task[field]} />
        {/if}
        <button>Done</button>
        <button
            type="button"
            onclick={() => {
                editing = null;
            }}>Cancel</button
        >
    </form>
{:else}
    <button
        class="block"
        onclick={() => {
            editing = field;
        }}
    >
        {@render children?.()}
    </button>
{/if}
