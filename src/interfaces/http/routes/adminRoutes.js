import express from 'express'
const router = express.Router()

import { obtenerTodasLasSolicitudes, actualizarEstadoSolicitud } from '../constrollers/adminController.js'


router.get('/solicitudes', obtenerTodasLasSolicitudes)

// Ruta para aprobar o rechazar solicitud
router.patch('/solicitudes/:usuarioId', actualizarEstadoSolicitud)

export default router
