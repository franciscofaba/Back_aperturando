import { Router } from 'express'
import {getEnvios,createEnvios,updateEnvios,deleteEnvios, getById} from'../controller/envios.controller.js'
const router = Router()

router.get('/envios', getEnvios)

router.get('/envios:envios', getById)

router.post('/envios', createEnvios)

router.patch('/envios/:envios', updateEnvios)

router.delete('/envios/:envios', deleteEnvios)

export default router