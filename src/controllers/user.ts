import { create_user } from "models/user.js";

import {User} from '#interfaces'

export const create = async (user: User):Promise<void> => {
    const res: void = await create_user(user)
    return res
}

