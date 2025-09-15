<script lang="ts">
    import { invalidate } from "$app/navigation";
    import { Check, X } from "@lucide/svelte";
    import Input, { type InputType } from "./input.svelte";
    import type { Task } from "./types";
    import { taskValidationFields } from "./util";
    import PhotoInput from "./photo-input.svelte";

    export type EditableField = "title" | "description" | "due_date" | "photo";

    let {
        task = $bindable(),
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
        due_date: "datetime-local",
        photo: "file",
    };

    async function onEdit(form: HTMLFormElement) {
        editing = null;
        const fdata = new FormData(form);
        const value = fdata.get(field);
        const validation = taskValidationFields[field].safeParse(value)
        if (!validation.success) {
            console.error(validation)
            return
        }
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
</script>

{#if editing === field}
    <form
        class="flex-grow relative"
        onsubmit={(e) => {
            e.preventDefault();
            onEdit((e as SubmitEvent).target as HTMLFormElement);
        }}
    >
        {#if field === "photo"}
            <PhotoInput value={task[field]} name={field} />
        {:else}
            <Input autofocus name={field} type={typeByField[field]} value={task[field]} />
        {/if}
        <div class="absolute bottom--1 bg-gray-500 rounded-b">
            <button class="p-2 cursor-pointer"><Check /></button>
            <button
                class="p-2 cursor-pointer"
                type="button"
                onclick={() => {
                    editing = null;
                }}>
                <X />
            </button>
        </div>
    </form>
{:else}
    <button
        class="block flex-grow text-start cursor-pointer hover:bg-gray-500/20"
        onclick={() => {
            editing = field;
        }}
    >
        {@render children?.()}
    </button>
{/if}
