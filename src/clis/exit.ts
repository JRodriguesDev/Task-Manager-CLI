import inquirer from "inquirer";

import {init} from '#clis'

export const exit_cli = async () => {
    console.clear()
    const answer = await inquirer.prompt([
        {
            type: 'confirm',
            name: 'value',
            message: 'Confirm to Exit'
        }
    ])
    if (answer.value == false) return init()
    return
}