import fs from 'fs/promises'

export const open_users_db = async () => {
    try {
        const data: []|string = await fs.readFile('./db/users.json', 'utf-8')
        return data.length > 0 ? JSON.parse(data) : [{}]
    } catch(err) {
        console.log((`Read users ${err}`))
        throw new Error(`${err}`)
    }
}

export const delete_user_db = async (user:string) => {
    try {
        const data: [] = JSON.parse(await fs.readFile('./db/users.json', 'utf-8'))
        await fs.writeFile(`./db/users.json`, JSON.stringify(data.filter((el:{name:string}) => el.name !== user), null, 2))
        await fs.rm(`./db/${user}`, {force: true, recursive: true})
    } catch {}
}