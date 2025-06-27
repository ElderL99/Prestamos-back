import express from 'express'
const router = express.Router()

import { crearSolicitudController } from '../constrollers/solicitudController.js'
import { enviarSolicitudController } from '../constrollers/enviarSolicitudController.js'
import { 
  subirDocumentoController, 
  obtenerDocumentosController, 
  eliminarDocumentoController 
} from '../../http/constrollers/documentoController.js'
import upload from '../../http/middlewares/uploadMiddleware.js'

// Crear solicitud
router.post('/', crearSolicitudController)

// Enviar solicitud
router.patch('/:usuarioId/enviar', enviarSolicitudController)

// Subir documentos (hasta 5 a la vez)
router.post('/:usuarioId/documentos', upload.array('documentos', 5), subirDocumentoController)

// Obtener documentos subidos
router.get('/:usuarioId/documentos', obtenerDocumentosController)

// Eliminar documento individual
router.delete('/:usuarioId/documentos', eliminarDocumentoController)





export default router
