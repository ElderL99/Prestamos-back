import Solicitud from '../entities/Solicitud.js'
import { guardarSolicitud } from '../../infra/db/repositories/guardarSolicitud.js'

export default async function crearSolicitud({ usuarioId, monto }) {
  const solicitud = new Solicitud({ usuarioId, monto })
  solicitud.cambiarEstado('borrador')

  const guardada = await guardarSolicitud(solicitud)
  return guardada
}
