<script lang="ts">
    import { invalidate } from "$app/navigation";
    import Input, {type InputType} from "./input.svelte";
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
        title: 'text',
        description: 'textarea',
        due_date: 'text',
        photo: 'file',
    }

    async function onEdit(form: HTMLFormElement) {
        editing = null
        const fdata = new FormData(form);
        const value = fdata.get(field);
        task[field] = value as string;
        await fetch(`/api/tasks/${task.id}`, { method: "PUT", body: fdata });
        invalidate(`/task/${task.id}`);
    }
</script>

{#if editing === field}
    <form
        onsubmit={(e) => {
            e.preventDefault();
            onEdit((e as SubmitEvent).target as HTMLFormElement);
        }}
    >
        <Input name={field} type={typeByField[field]} value={task[field]} />
        <button>Done</button>
        <button type="button" onclick={() => {editing = null}}>Cancel</button>
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
