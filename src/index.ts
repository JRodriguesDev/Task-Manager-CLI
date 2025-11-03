import {init} from './clis/init.js'
import {recover_db} from '#functions'

await recover_db()

init()