import fs from 'fs/promises'
import {v4 as uuid} from 'uuid'

import {Task} from '#interfaces'

export class Tasks {
    protected user_path: string
    constructor(user_path:string) {
        this.user_path = user_path
    }

    public async show_tasks() {
        const data = await fs.readFile(`./db/${this.user_path}/tasks.json`, 'utf-8')
        return data.length > 0 ? JSON.parse(data) : []
    }

    public async create_task(task: Task) {
        const data = JSON.parse(await fs.readFile(`./db/${this.user_path}/tasks.json`, 'utf-8'))
        data.push({...task, 'id': uuid(), 'status': 'pending'})
        await fs.writeFile(`./db/${this.user_path}/tasks.json`, JSON.stringify(data, null, 2))
    }
}