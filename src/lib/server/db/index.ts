import type { Task } from "$lib/types";
import {readFile, rm, writeFile} from 'node:fs/promises'

const photosBase = 'static/photos'
const dataPath = './data.json'

class Data {
    data: Task[] = []

    init = async () => {
        try {
            const data = await readFile(dataPath)
            this.data = JSON.parse(data.toString())
        } catch {}
    }

    get = (id: string) => data.data.find(t => t.id === id)

    write = async () => {
        await writeFile(dataPath, JSON.stringify(this.data))
    }

    writePhoto = async (task: Task, photo: File) => {
        const ext = photo.name.split('.').at(-1)
        task.photo = `${task.id}.${ext}`
        await writeFile(`${photosBase}/${task.photo}`, Buffer.from(await photo.arrayBuffer()))
    }

    add = async (task: Task, photo?: File) => {
        if (photo?.size) {
            await this.writePhoto(task, photo)
        }
        this.data.push(task)
        await this.write()
    }

    delete = async (id: string) => {
        this.data = this.data.filter(t => t.id != id)
        await this.write()
    }

    update = async (task: Task, photo?: File) => {
        const existing = this.get(task.id)
        if (photo) {
            if (existing?.photo && existing?.photo !== photo?.name) {
                try {
                await rm(`${photosBase}/${existing.photo}`)
                } catch (err) {
                    if ((err as any).code !== 'ENOENT') {
                        throw err
                    }
                }
            }
            if (photo.size) {
                await this.writePhoto(task, photo)
            } else {
                task.photo = undefined
            }
        }
        this.data = this.data.map(t => t.id === task.id ? task : t)
        await this.write()
    }
}

export function withPhotoUrl(task: Task | null): Task | null {
    if (!task?.photo) {
        return task
    }
    return {...task, photo: `/photos/${task.photo}`}
}

export const data = new Data()
await data.init()
