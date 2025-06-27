import { uploadFile, deleteFile } from '../../../infra/storage/s3.js'
import SolicitudModel from '../../../infra/db/models/SolicitudModel.js'

export const subirDocumentoController = async (req, res) => {
  try {
    const usuarioId = req.params.usuarioId;
    const archivos = req.files;
    const tipos = req.body.tipos; // viene como arreglo: ['INE', 'Domicilio', ...]

    if (!archivos || archivos.length === 0) {
      return res.status(400).json({ error: 'No se enviaron archivos' });
    }

    const solicitud = await SolicitudModel.findOne({ usuarioId });
    if (!solicitud) {
      return res.status(404).json({ error: 'Solicitud no encontrada' });
    }

    if (solicitud.estado !== 'borrador') {
      return res.status(403).json({ error: 'No puedes subir documentos si tu solicitud no está en estado borrador' });
    }

    const documentosSubidos = [];

    for (let i = 0; i < archivos.length; i++) {
      const archivo = archivos[i];
      const tipo = Array.isArray(tipos) ? tipos[i] : tipos; // soporte a un solo archivo también
      const resultado = await uploadFile(archivo.buffer, archivo.originalname, `documentos/${usuarioId}`);

      const nuevoDocumento = {
        url: resultado.url,
        fechaSubida: new Date(),
        tipo,
        key: resultado.key,
      };

      documentosSubidos.push(nuevoDocumento);
    }

    // Guardar todos en MongoDB
    await SolicitudModel.findOneAndUpdate(
      { usuarioId },
      { $push: { documentos: { $each: documentosSubidos } } }
    );

    return res.status(200).json({
      mensaje: 'Documentos subidos correctamente',
      documentos: documentosSubidos,
    });

  } catch (error) {
    console.error('❌ Error al subir documentos:', error);
    res.status(500).json({ error: 'Error al subir los documentos', detalle: error.message });
  }
};



export const obtenerDocumentosController = async (req, res) => {
  try {
    const { usuarioId } = req.params

    const solicitud = await SolicitudModel.findOne({ usuarioId })

    if (!solicitud) {
      return res.status(404).json({ error: 'Solicitud no encontrada' })
    }

    return res.status(200).json({ documentos: solicitud.documentos })
  } catch (error) {
    console.error('❌ Error al obtener documentos:', error)
    res.status(500).json({ error: 'Error al obtener los documentos' })
  }
}


export const eliminarDocumentoController = async (req, res) => {
  try {
    const { usuarioId } = req.params
    const { url } = req.body // desde el frontend envías la URL a eliminar

    const solicitud = await SolicitudModel.findOne({ usuarioId })
    if (!solicitud) {
      return res.status(404).json({ error: 'Solicitud no encontrada' })
    }

    if (solicitud.estado !== 'borrador') {
      return res.status(403).json({ error: 'No puedes eliminar documentos si la solicitud no está en estado borrador' })
    }

    // Extraemos la key del archivo desde la URL
    const key = url.split('.amazonaws.com/')[1]

    await deleteFile(key)

    // Eliminamos del array documentos[]
    solicitud.documentos = solicitud.documentos.filter(doc => doc.url !== url)
    await solicitud.save()

    return res.status(200).json({ mensaje: 'Documento eliminado correctamente' })
  } catch (error) {
    console.error('❌ Error al eliminar documento:', error)
    res.status(500).json({ error: 'Error al eliminar el documento', detalle: error.message })
  }
}
