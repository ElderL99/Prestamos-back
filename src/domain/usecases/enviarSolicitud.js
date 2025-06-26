import SolicitudModel from '../../infra/db/models/SolicitudModel.js'
import Solicitud from '../entities/Solicitud.js'

export default async function enviarSolicitud(usuarioId) {
  const datos = await SolicitudModel.findOne({ usuarioId })

  if (!datos) {
    throw new Error('Solicitud no encontrada')
  }

  const entidad = new Solicitud(datos)

  if (entidad.estado !== 'borrador') {
    throw new Error('Solo puedes enviar solicitudes en estado borrador')
  }

  entidad.cambiarEstado('pendiente')

  await SolicitudModel.findOneAndUpdate(
    { usuarioId },
    {
      estado: entidad.estado,
      historialEstados: entidad.historialEstados,
    }
  )

  return entidad
}
