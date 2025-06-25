import express from 'express'
import { crearSolicitudController } from '../constrollers/solicitudController.js'


const router = express.Router()

router.post('/', crearSolicitudController)

export default router
