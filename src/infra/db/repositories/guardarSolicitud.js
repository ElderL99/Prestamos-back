import SolicitudModel from '../models/SolicitudModel.js'

export async function guardarSolicitud(solicitudEntidad) {
  const nuevaSolicitud = new SolicitudModel({
    usuarioId: solicitudEntidad.usuarioId,
    monto: solicitudEntidad.monto,
    estado: solicitudEntidad.estado,
    documentos: solicitudEntidad.documentos,
    historialEstados: solicitudEntidad.historialEstados,
    fechaCreacion: solicitudEntidad.fechaCreacion,
  })

  const resultado = await nuevaSolicitud.save()
  return resultado
}
