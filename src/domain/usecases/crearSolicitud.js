import Solicitud from '../entities/Solicitud.js'

export default function crearSolicitud({ usuarioId, monto }) {
  const solicitud = new Solicitud({ usuarioId, monto })
  solicitud.cambiarEstado('borrador')

  return solicitud
}
