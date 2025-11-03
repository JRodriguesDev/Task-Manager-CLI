import fs from 'fs/promises'

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
        console.log('Created db sucess...')
    }
    console.log('Verify Sucess')
}

export {recover as recover_db}