<script lang="ts">
    import Input from "$lib/input.svelte";
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
    <Input label="Title" name="title" autofocus />
    <Input label="Due date" name="due_date" />
    <Input type="textarea" label="Description" name="description" />
    <Input type="file" label="Photo" name="photo" />
    <div>
        <button>Add</button>
        <button type="button" onclick={() => history.back()}>Cancel</button>
    </div>
</form>
