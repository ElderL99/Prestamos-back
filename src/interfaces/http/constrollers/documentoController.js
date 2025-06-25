import { uploadFile } from '../../../infra/storage/s3.js'
import SolicitudModel from '../../../infra/db/models/SolicitudModel.js'

export const subirDocumentoController = async (req, res) => {
  try {
    const usuarioId = req.params.usuarioId
    const archivos = req.files 

    if (!archivos || archivos.length === 0) {
      return res.status(400).json({ error: 'No se envió ningún archivo' })
    }

    // 1. Verificar estado
    const solicitud = await SolicitudModel.findOne({ usuarioId })

    if (!solicitud) {
      return res.status(404).json({ error: 'Solicitud no encontrada' })
    }

    if (solicitud.estado !== 'borrador') {
      return res.status(403).json({
        error: 'No puedes subir documentos si tu solicitud no está en estado borrador'
      })
    }

    // 2. Subir cada archivo a S3 y guardar en documentos[]
    const documentosAGuardar = []

    for (const archivo of archivos) {
      const resultado = await uploadFile(
        archivo.buffer,
        archivo.originalname,
        `documentos/${usuarioId}`
      )

      documentosAGuardar.push({
        url: resultado.url,
        fechaSubida: new Date()
      })
    }

    await SolicitudModel.findOneAndUpdate(
      { usuarioId },
      { $push: { documentos: { $each: documentosAGuardar } } }
    )

    return res.status(200).json({
      mensaje: 'Todos los archivos fueron subidos y registrados correctamente',
      documentos: documentosAGuardar
    })
  } catch (error) {
    console.error('❌ Error al subir a S3 o guardar en MongoDB:', error)
    res.status(500).json({
      error: 'Error al subir los documentos',
      detalle: error.message
    })
  }
}
