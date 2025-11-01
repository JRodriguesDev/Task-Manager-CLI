import inquirer from "inquirer"


class UserCli {
    name: string 

    constructor(name:string) {
        this.name = name
    }

    user_cli() {
        console.clear()
        const answer = inquirer.prompt([
            {
                type: 'list',
                name: 'options',
                message: `Welcome ${this.name}`,
                choices: []
            }
        ]) 
    }
}