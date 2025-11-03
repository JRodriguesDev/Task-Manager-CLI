import fs from 'fs/promises'
import bcrypt from 'bcryptjs'

import {open_users_db} from '#functions'
import {User} from '#interfaces'

export const create = async (user: User):Promise<void> => {
    await fs.mkdir(`./db/${user.name}`)
    await fs.writeFile(`./db/${user.name}/tasks.json`, [""], "utf-8")
    const data = await open_users_db()
    if (data) data.push({"name": user.name, "password": await bcrypt.hash(user.password, 10)})
    await fs.writeFile('./db/users.json', JSON.stringify(data, null, 2))
}

