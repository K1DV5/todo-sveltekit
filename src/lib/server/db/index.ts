import type { Task } from "$lib/types";
import { put, del, list } from "@vercel/blob";
import { BLOB_READ_WRITE_TOKEN } from '$env/static/private'
import { readFile, rm, writeFile } from "fs/promises";

const dataPath = 'data.json'
const photosDir = 'photos'

const fsName = (name: string) => name.endsWith('.json') ? name : `static/${name}`

async function writeF(name: string, contents: string | File) {
    if (BLOB_READ_WRITE_TOKEN) {
        const blob = await put(name, contents, {access: "public", token: BLOB_READ_WRITE_TOKEN, allowOverwrite: true})
        return blob.downloadUrl
    }
    await writeFile(fsName(name), typeof contents === 'string' ? contents : await contents.bytes())
    return `/${name}`
}

async function deleteF(name: string) {
    if (!BLOB_READ_WRITE_TOKEN) {
        try {
            await rm(fsName(name))
        } catch (err) {
            if ((err as any).code !== 'ENOENT') {
                throw err
            }
        }
        return
    }
    await del(name, {token: BLOB_READ_WRITE_TOKEN})
}

async function readFtxt(name: string) {
    if (!BLOB_READ_WRITE_TOKEN) {
        try {
            return (await readFile(fsName(name))).toString()
        } catch (err) {
            if ((err as any).code !== 'ENOENT') {
                throw err
            }
        }
        return
    }
    const files = await list({token: BLOB_READ_WRITE_TOKEN})
    const blob = files.blobs.find(b => b.pathname === name)
    if (!blob) {
        return
    }
    const res = await fetch(blob.downloadUrl)
    return await res.text()
}

class Data {
    data: Task[] = []

    init = async () => {
        const contents = await readFtxt(dataPath)
        if (!contents) {
            return
        }
        this.data = JSON.parse(contents)
    }

    get = (id: string) => data.data.find(t => t.id === id)

    write = async () => {
        await writeF(dataPath, JSON.stringify(this.data))
    }

    writePhoto = async (task: Task, photo: File) => {
        const ext = photo.name.split('.').at(-1)
        task.photo = await writeF(`${photosDir}/${task.id}.${ext}`, photo)
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
            await deleteF(task.photo)
        }
        this.data = this.data.filter(t => t.id !== id)
        await this.write()
    }

    update = async (task: Task, photo?: File) => {
        const existing = this.get(task.id)
        if (photo) {
            if (existing?.photo && existing?.photo !== photo?.name) {
                await deleteF(existing.photo)
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
