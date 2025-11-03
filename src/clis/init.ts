import { select, Separator } from '@inquirer/prompts';
import {register_cli, login_cli, credits_cli, exit_cli} from '#clis'

enum InitChoices {
    'Register',
    'Login',
    'Credits',
    'Exit'
}

const init_cli = async (): Promise<void> => {
    console.clear()
    const answer = await select({
        message: 'Welcome to Task Manager CLI',
        choices: [
            {
                name: InitChoices[0],
                value: InitChoices[0],
                description: 'Register new User'
            },
            {
                name: InitChoices[1],
                value: InitChoices[1],
                description: 'User Login'
            },

            new Separator(),
            {
                name: InitChoices[2],
                value: InitChoices[2],
                description: 'Description and Credits'
            },
            {
                name: InitChoices[3],
                value: InitChoices[3],
                description: 'Exit...'
            }
        ]
    })

    switch(answer) {
        case InitChoices[0]:
            await register_cli()
            return init_cli()
        case InitChoices[1]:
            return login_cli()
        case InitChoices[2]:
            return credits_cli()
        case InitChoices[3]:
            return exit_cli()
    }
}


export {init_cli as init}