import fs from 'fs/promises'

import {init} from './prompts/index.js'
import {chalk_colors} from '#colors'
import {recover_db} from '#functions'

recover_db()

//init()