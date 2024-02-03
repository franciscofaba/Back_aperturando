import express from 'express'
import enviosRoutes from './routes/envios.routes.js'
import indexRoutes from './routes/index.routes.js'

 
const app = express()

app.use(express.json())
app.use(indexRoutes)
app.use('/api', enviosRoutes)

app.use((res,req,next) =>{
    res.statusCode(404).json({
        message: 'Endpoint not found'
    })
})

export default app;
