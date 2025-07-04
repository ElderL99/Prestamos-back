// src/domain/usecases/admin/cambiarEstadoSolicitud.js
import SolicitudModel from '../../../infra/db/models/SolicitudModel.js'

export default async function cambiarEstadoSolicitud({ usuarioId, nuevoEstado, motivo }) {
  const solicitud = await SolicitudModel.findOne({ usuarioId })

  if (!solicitud) {
    throw new Error('Solicitud no encontrada')
  }

  if (solicitud.estado === 'borrador') {
    throw new Error('No puedes cambiar el estado de una solicitud que aún está en borrador')
  }

  if (nuevoEstado === 'rechazado') {
    if (!motivo || motivo.trim() === '') {
      throw new Error('Debes proporcionar un motivo de rechazo')
    }

    solicitud.rechazo = {
      motivo,
      fecha: new Date()
    }
  } else {
    solicitud.rechazo = undefined // limpiamos si fue aprobado
  }

  solicitud.estado = nuevoEstado
  solicitud.historialEstados.push({ estado: nuevoEstado, fecha: new Date() })

  await solicitud.save()

  return solicitud
}
