import fs from 'fs/promises'
import {chalk_colors} from '#colors'

export const open_users_db = async () => {
    try {
        const data: []|string = await fs.readFile('./db/users.json', 'utf-8')
        return data.length > 0 ? JSON.parse(data) : [{}]
    } catch(err) {
        console.log(chalk_colors.error(`Read users ${err}`))
        throw new Error(`${err}`)
    }
}