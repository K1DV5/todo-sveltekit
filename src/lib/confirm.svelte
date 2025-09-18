<script lang="ts" module>

    let quest: string = $state('')
    let onConfirm: (accepted: boolean) => void = console.log
    let node: HTMLDialogElement

    export function confirm(question: string): Promise<boolean> {
        quest = question
        node.showModal()
        return new Promise(res => {
            onConfirm = accepted => {
                quest = ''
                res(accepted)
                node.close()
            }
        })
    }

    function onAttach(elm: HTMLDialogElement) {
        node = elm
    }

</script>

<dialog class="m-auto p-4 rounded-lg border backdrop:bg-gray-500/20" {@attach onAttach}>
    <div>{quest}</div>
    <div class="mt-2">
        <button class="cursor-pointer rounded-lg bg-blue-500 px-4 py-2" onclick={() => onConfirm(true)}>Yes</button>
        <button class="cursor-pointer rounded-lg border border-blue-500 px-4 py-2" onclick={() => onConfirm(false)}>No</button>
    </div>
</dialog>
