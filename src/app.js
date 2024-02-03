import app from './index.js'
import {PORT} from './config.js'

app.listen(PORT)
console.log('server running on port', PORT)