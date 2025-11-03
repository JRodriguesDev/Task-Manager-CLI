import inquirer from "inquirer"
import {v4 as uuid} from 'uuid'

import {Tasks} from '#manger'
import {init} from '#clis'
import {delete_user_db} from '#functions'
import {Task} from '#interfaces'
import { Separator } from "@inquirer/select"

export class UserCli extends Tasks {
    private user: string
    constructor(user:string) {
        super(user)
        this.user = user
        this.main_cli()
    }

    private async main_cli() {
        console.clear()
        const answer:{option:string} = await inquirer.prompt([
            {
                type: 'list',
                name: 'option',
                message: `Welcome ${this.user}`,
                choices: [
                    {
                        name: 'Tasks',
                        value: 'tasks',
                        description: 'User Tasks'
                    },
                    {
                        name: 'Delete',
                        value: 'delete',
                        description: `Delete User ${this.user}`
                    },
                    {
                        name: 'Menu',
                        value: 'menu',
                        description: 'Return to Menu'
                    },
                ]
            }
        ])
        switch(answer.option) {
            case 'tasks':
                this.show_tasks_cli()
                break;
            case 'menu':
                init()
                break;
            case 'delete':
                this.delete_user(this.user)
                break;
        }
    }

    private async delete_user(name: string) {
        console.clear()
        const answer = await inquirer.prompt([
            {
                type: 'confirm',
                name: 'value',
                message: `Delete User ${name}?`
            }
        ])
        if (answer.value == false)  return this.main_cli()
        await delete_user_db(name)
        init()
    }

    private async show_tasks_cli() {
        const data = await this.show()
        if (data.length == 0) return this.no_tasks()

        const tasks = data.map((el: Task) => {return {'name': el.name, 'value': el.name}})
        console.clear()
        const answer = await inquirer.prompt([
            {
                type: 'list',
                name: 'option',
                message: 'Select Task',
                choices: [
                    ...tasks,
                    new Separator('----------'),
                    {
                        name: 'Create Task',
                        value: 'create',
                        description: 'Create new Task'
                    }
                ]
            }
        ])
        if (answer.option == 'create') return this.create_task_cli()
        this.view_task(answer.option)
    }

    private async view_task(name: string) {
        const data = await this.show()
        const task:Task = data.find((el:Task) => el.name == name)
        
        console.clear()
        console.log('----- TASK -----')
        console.log(`Name: ${task.name}`)
        console.log(`Status: ${task.status}`)
        console.log(`Description: ${task.description}\n`)

        const answer = await inquirer.prompt([
            {
                type: 'list',
                name: 'option',
                message: 'Edit Task?',
                choices: [
                    {   
                        name: 'Edit Status',
                        value: 'status',
                        description: 'Edit Status...'
                    },
                    {   
                        name: 'Edit Description',
                        value: 'description',
                        description: 'Edit Description...'
                    },
                    {   
                        name: 'Delete Task',
                        value: 'delete',
                        description: 'Delete Task...'
                    },
                    new Separator('----------'),
                    {
                        name: 'Back',
                        value: 'back'
                    }
                ]
            }
        ])
        switch(answer.option) {
            case 'status':
                this.update_task(name, answer.option)
                break;
            case 'description':
                this.update_task(name, answer.option)
                break;
            case 'delete':
                this.delete_task(name)
                break;
            case 'back':
                this.main_cli()
                break;
        }
    }

    private async no_tasks() {
        console.clear()
        const answer = await inquirer.prompt([
            {
                type: 'list',
                name: 'options',
                message: 'No Tasks Avaliable',
                choices: [
                    {
                        name: 'Create Task',
                        value: 'Create Task'
                    },
                    {
                        name: 'Back',
                        value: 'Back'
                    }
                ]
            }
        ])

    switch (answer.options) {
        case 'Create Task':
            this.create_task_cli()
            break;
        case 'Back':
            this.main_cli()
            break;
        }
    }

    private async create_task_cli() {
        console.clear()
        const answer = await inquirer.prompt([
            {
                type: 'input',
                name: 'name',
                message: 'What Name Task?'
            },
            {
                type: 'input',
                name: 'description',
                message: 'What Task Description?'
            },
            {
                type: 'list',
                name: 'status',
                message: 'Select Task Status',
                choices: [
                    {
                        name: 'Pending',
                        value: 'pending',
                        description: 'Task is Pending'
                    },
                    {
                        name: 'Progress',
                        value: 'progress',
                        description: 'Task is Progress....'
                    }
                ]
            }
        ])
        await this.create(answer)
        this.main_cli()
    }

    private async update_task(name:string, value:string) {
        const data = await this.show()
        const task:Task = data.find((el:Task) => el.name == name)

        console.clear()
        if (value == 'description') {
            const answer = await inquirer.prompt([
                {
                    type: 'input',
                    name: 'description',
                    message: 'Input New Description',
                }
            ])
        this.update(name, value, answer.description)
        } else if (value == 'status') {
            const answer = await inquirer.prompt([
                {
                    type: 'list',
                    name: 'option',
                    message: 'Select new Status',
                    choices: [
                        {
                            name: 'Pending',
                            value: 'pending'
                        },
                        {
                            name: 'Progress',
                            value: 'progress'
                        },
                        {
                            name: 'Complete',
                            value: 'complete'
                        },
                    ]
                }
            ])
        this.update(name, value, answer.option)
        }
    }

    private async delete_task(name: string) {
        console.clear()
        const answer = await inquirer.prompt([
            {
                type: 'confirm',
                name: 'value',
                message: `Delete Task ${name}?`
            }
        ])
        if (answer.value == false) return this.view_task(name)
        await this.delete(name)
        this.main_cli()
    }
}
