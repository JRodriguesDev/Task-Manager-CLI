import inquirer from "inquirer"
import bcrypt from "bcryptjs"

import {open_users_db} from '#functions'
import {User} from '#interfaces'
import {init, UserCli} from '#clis'

export const login_cli = async () => {
    const data = await open_users_db()
    const users = data
                    .filter((el: User) => typeof(el.name) == 'string' ? el.name : '' )
                    .map((el: User) => {return {'name': el.name, 'value': el.name}})
    if (users.length == 0) return no_users_cli()

    console.clear()
    const answer = await inquirer.prompt([
        {
            type: 'list',
            name: 'user',
            message: 'Select User',
            choices: [
                ...users,
            ],
        },
        {
            type: 'password',
            name: 'password',
            message: 'Password?',
            mask: true,
        }
    ])

    const password = data.find((el:User) => el.name == answer.user)?.password

    if (await bcrypt.compare(answer.password, password)) {
        new UserCli(answer.user)
        return
    } 
    return init()
}

const no_users_cli = async () => {
    const answer = await inquirer.prompt([
        {
            type: 'list',
            name: 'options',
            message: 'No Users Avaliable',
            choices: [
                {
                    name: 'Back',
                    value: 'Back'
                }
            ]
        }
    ])

    if (answer.options == 'Back') return init()
}