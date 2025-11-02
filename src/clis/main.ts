import inquirer from "inquirer"

import {Tasks} from '#manger'
import {init} from '#clis'
import {delete_user_db} from '#functions'

export class UserCli extends Tasks {
    user: string
    constructor(user:string) {
        super(user)
        this.user = user
        this.main_cli()
    }

    async main_cli() {
        console.clear()
        const answer:{option:string} = await inquirer.prompt([
            {
                type: 'list',
                name: 'option',
                message: `Welcome ${this.user}`,
                choices: [
                    {
                        name: 'Task',
                        value: 'Task',
                        description: 'User Tasks'
                    },
                    {
                        name: 'Delete',
                        value: 'Delete',
                        description: `Delete User ${this.user}`
                    },
                    {
                        name: 'Menu',
                        value: 'Menu',
                        description: 'Return to Menu'
                    },
                ]
            }
        ])
        console.log(answer)
        switch(answer.option) {
            case 'Menu':
                init()
                break;
            case 'Delete':
                delete_user_db(this.user)
                init()
                break;
        }

    }

}
