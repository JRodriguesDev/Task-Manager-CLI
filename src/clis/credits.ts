import inquirer from "inquirer"

import { init } from '#clis'

export const credits_cli = async () => {
    console.clear()
    console.log('Project designed to relearn JavaScript and TypScript.')
    console.log('Created By: JRodriguesDev')
    console.log('GitHub Link: https://github.com/JRodriguesDev\n')

    const answer = await inquirer.prompt([
        {
            type: 'list',
            name: 'option',
            message: 'Back To Menu?',
            choices: [{name: 'Back', value: 'back'}]
        }
    ])
    init()
}