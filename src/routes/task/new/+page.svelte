<script lang="ts">
    import { goto } from "$app/navigation";
    import Input from "$lib/input.svelte";
    import PhotoInput from "$lib/photo-input.svelte";
    import { state as appState } from "$lib/state.svelte";
    import { newTaskSchema } from "$lib/util";

    async function submit(form: FormData) {
        const res = await fetch('/api/tasks', {method: 'POST', body: form})
        appState.loading = false
        if (res.ok) {
            goto('/')
            return
        }
        const data: {message: string} = await res.json()
        appState.alert = {
            type: 'error',
            message: data.message
        }
    }

    function onSubmit(e: SubmitEvent) {
        e.preventDefault()
        const form = new FormData(e.target as HTMLFormElement)
        const data = newTaskSchema.safeParse(Object.fromEntries(form))
        if (!data.success) {
            appState.alert = {
                type: 'error',
                message: data.error.issues.map(i => `${i.path.join('.')}: ${i.message}`).join('\n'),
            }
            return
        }
        appState.loading = true
        submit(form)
    }
</script>

<svelte:head>
    <title>New task</title>
</svelte:head>

<form method="POST" action="/api/tasks/" enctype="multipart/form-data" onsubmit={onSubmit}>
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
        <button disabled={appState.loadingOptim} class="mx-1 {appState.loadingOptim ? 'bg-gray-400' : 'bg-blue-400'} px-4 py-2 rounded-lg cursor-pointer">
            {appState.loadingOptim ? 'Adding...' : 'Add'}
        </button>
        <button disabled={appState.loadingOptim} class="mx-1 border {appState.loadingOptim ? 'border-gray-400' : 'border-blue-400'} rounded-lg p-2 cursor-pointer" type="button" onclick={() => history.back()}>Cancel</button>
    </div>
</form>
