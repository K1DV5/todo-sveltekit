import type { Task } from "$lib/types";
import { put, del, list } from "@vercel/blob";
import { BLOB_READ_WRITE_TOKEN } from '$env/static/private'

const photosDir = 'photos'
const dataPath = 'data.json'

class Data {
    data: Task[] = []

    init = async () => {
        const files = await list({token: BLOB_READ_WRITE_TOKEN})
        const blob = files.blobs.find(b => b.pathname === dataPath)
        if (!blob) {
            return
        }
        const res = await fetch(blob.downloadUrl)
        this.data = await res.json()
    }

    get = (id: string) => data.data.find(t => t.id === id)

    write = async () => {
        await put(dataPath, JSON.stringify(this.data), {access: "public", token: BLOB_READ_WRITE_TOKEN, allowOverwrite: true})
    }

    writePhoto = async (task: Task, photo: File) => {
        const ext = photo.name.split('.').at(-1)
        const blob = await put(`${photosDir}/${task.id}.${ext}`, photo, {access: 'public', token: BLOB_READ_WRITE_TOKEN, allowOverwrite: true})
        task.photo = blob.downloadUrl
    }

    add = async (task: Task, photo?: File) => {
        if (photo?.size) {
            await this.writePhoto(task, photo)
        }
        this.data.push(task)
        await this.write()
    }

    delete = async (id: string) => {
        const task = this.data.find(t => t.id === id)
        if (task?.photo) {
            await del(task.photo, {token: BLOB_READ_WRITE_TOKEN})
        }
        this.data = this.data.filter(t => t.id !== id)
        await this.write()
    }

    update = async (task: Task, photo?: File) => {
        const existing = this.get(task.id)
        if (photo) {
            if (existing?.photo && existing?.photo !== photo?.name) {
                await del(existing.photo, {token: BLOB_READ_WRITE_TOKEN})
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

export const data = new Data()
await data.init()
