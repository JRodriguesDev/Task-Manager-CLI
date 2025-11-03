import fs from 'fs/promises'

import {Task} from '#interfaces'

export class Tasks {
    private user_path: string

    constructor(user_path:string) {
        this.user_path = `./db/${user_path}/tasks.json`
    }

    protected async show() {
        const data = await fs.readFile(this.user_path, 'utf-8')
        const tasks = data.length > 0 ? JSON.parse(data) : []
        return tasks.filter((el:Task) => typeof(el.name) == 'string')
    }

    protected async create(task: Task) {
        const data = await fs.readFile(this.user_path, 'utf-8')
        const res = data.length > 0 ? JSON.parse(data): [{}]
        res.push(task)
        await fs.writeFile(this.user_path, JSON.stringify(res, null, 3))
    }

    protected async update(name: string, category: string, value: Task) {
        const data = await fs.readFile(this.user_path, 'utf-8')
        const tasks = JSON.parse(data)
        const index: number = tasks.findIndex((el: Task) => el.name == name)
        const task = tasks.find((el: Task) => el.name == name)
        const new_tasks = {...task, [category]: value}
        tasks[index] = new_tasks
        await fs.writeFile(this.user_path, JSON.stringify(tasks, null, 3))
    }

    protected async delete(name: string) {
        const data = await fs.readFile(this.user_path, 'utf-8')
        const tasks = JSON.parse(data)
        const new_taks = tasks.filter((el: Task) => el.name !== name)
        await fs.writeFile(this.user_path, JSON.stringify(new_taks, null, 3))
    }
}