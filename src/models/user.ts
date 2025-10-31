import fs from 'fs/promises'
import bcrypt from 'bcryptjs'

import {read_json} from '#functions'
import {User} from '#interfaces'
import {chalk_colors} from '#colors'

export const create_user = async (user: User):Promise<void> => {
    try {
        await fs.mkdir(`./db/${user.name}`)
        await fs.writeFile(`./db/${user.name}/tasks.json`, [""], "utf-8")
        const data = await read_json('./db/users.json')
        if (data) data.push({"name": user.name, "password": await bcrypt.hash(user.password, 10)})
        await fs.writeFile('./db/users.json', JSON.stringify(data, null, 2))
        console.log(chalk_colors.sucess(`User ${user.name} Created Sucess`))
    
    } catch(Err) {
        console.log(chalk_colors.error(`Create User ${user.name} ${Err}`))
    }
}