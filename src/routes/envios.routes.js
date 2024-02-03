import { Router } from 'express'
import {getEnvios,createEnvios,updateEnvios,deleteEnvios} from'../controller/envios.controller.js'
const router = Router()

router.get('/envios', getEnvios)

router.post('/envios', createEnvios)

router.put('/envios', updateEnvios)

router.delete('/envios', deleteEnvios)

export default router