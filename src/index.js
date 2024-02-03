import express from 'express'
import enviosRoutes from './routes/envios.routes.js'
import indexRoutes from './routes/index.routes.js'

const app = express()

app.use(express.json())

app.use(indexRoutes)
app.use('/api', enviosRoutes)

app.listen(3000)
console.log('server running on port 3000')