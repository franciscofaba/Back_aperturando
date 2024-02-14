import { Router } from 'express'
import {getEnvios,createEnvios,updateEnvios,deleteEnvios, getById, getByLotes, getEnvios_proceso} from'../controller/envios.controller.js'
const router = Router()

router.get('/envios', getEnvios)

router.get('/envios/:envio', getById)

router.post('/envios', createEnvios)

router.patch('/envios/:envio', updateEnvios)


router.delete('/envios/:envio', deleteEnvios)

router.get('/envios/lotes/:lote', getByLotes)

router.get('/envios1/proceso/', getEnvios_proceso)

export default router