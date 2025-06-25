import express from 'express'
import { crearSolicitudController } from '../constrollers/solicitudController.js'
import upload from '../../http/middlewares/uploadMiddleware.js'
import { subirDocumentoController } from '../../http/constrollers/documentoController.js'

const router = express.Router()

router.post('/', crearSolicitudController)

//RUTA para subir documentos a S3
router.post('/:usuarioId/documentos', upload.array('documentos', 5), subirDocumentoController);

export default router
