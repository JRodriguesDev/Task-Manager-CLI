import inquirer from "inquirer";
import { create } from "#controllers/user.js";

export const register_cli = async ():Promise<void>  => {
    const answers = await inquirer.prompt([
        {
            type: 'input',
            name: 'name',
            message: 'Input you Name: ',
            required: true
        },
        {
            type: 'password',
            name: 'password',
            message: 'Input You Password',
            mask: true,
        },
    ])

    const res = await create(answers) 
}