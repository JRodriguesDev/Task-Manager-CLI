import fs from 'fs/promises'
import {chalk_colors} from '#colors'

export const read_json = async (path: string): Promise<[{}] | void> => {
    try {
        const data: []|string = await fs.readFile(path, 'utf-8')
        return data.length > 0 ? JSON.parse(data): [{}]
    } catch(Err) {
        console.log(chalk_colors.error(`Read db ${Err}`))
        throw new Error(`${Err}`)
    }
}