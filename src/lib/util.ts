import type { Sort, Task } from "./types";
import z, { ZodError } from "zod";

export function sortFilterTasks(tasks: Task[], sort: Sort, filter: string) {
    return tasks
        .map((task, i) => [task, i] as [Task, number])
        .sort(([t1], [t2]) => {
            if (sort.by === 'title') {
                if (sort.ascending.title) {
                    return t1.title < t2.title ? -1 : 1
                }
                return t1.title > t2.title ? -1 : 1
            }
            if (!t1.due_date || !t2.due_date) {
                return 0
            }
            const due1 = Date.parse(t1.due_date as string)
            const due2 = Date.parse(t2.due_date as string)
            if (sort.ascending.due) {
                return due1 < due2 ? -1 : 1
            }
            return due1 > due2 ? -1 : 1
        })
        .filter(([task]) => task.title.includes(filter))
}

export const taskValidationFields = {
    title: z.string().max(100).min(1),
    description: z.string().max(500).optional(),
    due_date: z.string().optional(),
    photo: z.file().optional(),
}

export const newTaskSchema = z.object(taskValidationFields)

export function formatValidationError(err: ZodError<any>) {
    return err.issues.map(issue => `${issue.path.join('.')}: ${issue.message}`).join('\n')
}

// Resize if too large
const maxPhotoWidth = 600;
const maxPhotoHeight = 600;

export function optimizeImage(file: File): Promise<File> {
    return new Promise(res => {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        const img = new Image();
        img.onload = () => {
            let { width, height } = img

            if (width > maxPhotoWidth || height > maxPhotoHeight) {
                const ratio = Math.min(maxPhotoWidth / width, maxPhotoHeight / height);
                width *= ratio;
                height *= ratio;
            }

            canvas.width = width;
            canvas.height = height;
            ctx?.drawImage(img, 0, 0, width, height);

            canvas.toBlob(blob => {
                res(new File([blob!], 'optimized.jpg', { type: 'image/jpeg' }));
            }, 'image/jpeg', 0.8);
        };
        img.src = URL.createObjectURL(file);
    });
}
