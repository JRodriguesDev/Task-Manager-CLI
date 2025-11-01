import fs from 'fs/promises'

import {chalk_colors} from '#colors'

const recover = async (): Promise<void> => {
    const path = await fs.readdir('./', 'utf-8')
    if (path.includes('db')) {
        const archives = await fs.readdir('./db', 'utf-8')
        if (!archives.includes('users.json')) {
            await fs.writeFile('./db/users.json', [''], 'utf-8')
        }
    } else {
        await fs.mkdir('./db')
        await fs.writeFile('./db/users.json', '', 'utf-8')
        console.log(chalk_colors.sucess('Created db sucess...'))
    }
    console.log(chalk_colors.complete('Verify Sucess'))
}

export {recover as recover_db}