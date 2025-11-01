import { select, Separator } from '@inquirer/prompts';
import {register_cli} from './register.js'

enum InitChoices {
    'Register',
    'Login',
    'Credits'
}

const init_cli = async () => {
    const answer = await select({
        message: 'Welcome to Task Manager CLI',
        choices: [
            {
                name: InitChoices[0],
                value: InitChoices[0],
                description: 'User Login'
            },
            {
                name: InitChoices[1],
                value: InitChoices[1],
                description: 'Register new User'
            },

            new Separator(),
            {
                name: InitChoices[2],
                value: InitChoices[2],
                description: 'Description and Credits'
            }
        ]
    })

    switch(answer) {
        case InitChoices[0]:
            const res = await register_cli()
            console.clear()
            init_cli()
            break;
    }
}


export {init_cli as init}