<script lang="ts">
    import Input from "$lib/input.svelte";
</script>

<svelte:head>
    <title>New task</title>
</svelte:head>


<form method="POST" action="/api/tasks/" enctype="multipart/form-data">
    <Input label="Title" name="title" />
    <Input label="Due date" name="due_date" />
    <Input type="textarea" label="Description" name="description" />
    <Input type="file" label="Photo" name="photo" />
    <div>
        <button>Add</button>
        <button type="button" onclick={() => history.back()}>Cancel</button>
    </div>
</form>
