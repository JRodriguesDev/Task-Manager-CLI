import inquirer from "inquirer"
import { Separator } from "@inquirer/select"
import bcrypt from "bcryptjs"

import {open_users_db} from '#functions'
import {User} from '#interfaces'
import {init} from 'clis/index.js'

export const login_cli = async () => {
    const data = await open_users_db()
    const users = data
                    .filter((el: User) => typeof(el.name) == 'string' ? el.name : '' )
                    .map((el: User) => {return {'name': el.name, 'value': el.name}})
    
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
    await bcrypt.compare(answer.password, password) ? console.log('foi') : init()
}