<script lang="ts">
    import Input from "$lib/input.svelte";
    import PhotoInput from "$lib/photo-input.svelte";
    import { taskValidationFields } from "$lib/util";
    import z from "zod";

    const newTaskSchema = z.object(taskValidationFields)

    function validate(e: SubmitEvent) {
        const form = new FormData(e.target as HTMLFormElement)
        const data = newTaskSchema.safeParse(Object.fromEntries(form))
        if (data.success) {
            return
        }
        console.error(data)
        e.preventDefault()
    }
</script>

<svelte:head>
    <title>New task</title>
</svelte:head>

<form method="POST" action="/api/tasks/" enctype="multipart/form-data" onsubmit={validate}>
    <div class="p-2">
        <Input label="Title" name="title" autofocus />
        <Input type="textarea" label="Description" name="description" />
    </div>
    <div class="flex flex-wrap mt-4">
        <div class="flex-grow p-2 basis-60">
            <Input label="Due date" name="due_date" type="datetime-local"/>
        </div>
        <div class="flex-grow p-2">
            <PhotoInput label="Photo" name="photo" />
        </div>
    </div>
    <div class="p-1">
        <button class="mx-1 bg-blue-400 px-4 py-2 rounded-lg cursor-pointer">Add</button>
        <button class="mx-1 border border-blue-400 rounded-lg p-2 cursor-pointer" type="button" onclick={() => history.back()}>Cancel</button>
    </div>
</form>
