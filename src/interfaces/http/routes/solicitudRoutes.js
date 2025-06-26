import express from 'express'
import { crearSolicitudController } from '../constrollers/solicitudController.js'
import upload from '../../http/middlewares/uploadMiddleware.js'
import { subirDocumentoController } from '../../http/constrollers/documentoController.js'
import { enviarSolicitudController } from '../constrollers/enviarSolicitudController.js'

const router = express.Router()

router.post('/', crearSolicitudController)

//RUTA para subir documentos a S3
router.post('/:usuarioId/documentos', upload.array('documentos', 5), subirDocumentoController);
router.patch('/:usuarioId/enviar', enviarSolicitudController)

export default router
