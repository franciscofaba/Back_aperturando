import { Router } from 'express'
import {getLotes,getById_lotes,createLotes,updateLotes,deleteLotes} from'../controller/lotes.controller.js'
const router = Router()

router.get('/lotes', getLotes)

router.get('/lotes/:id_lote', getById_lotes)

router.post('/lotes', createLotes)

router.patch('/lotes/:id_lote', updateLotes)

router.delete('/lotes/:id_lote', deleteLotes)

export default router