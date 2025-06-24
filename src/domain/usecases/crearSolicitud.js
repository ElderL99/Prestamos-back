import Solicitud from "../entities/Solicitud.js"

function crearSolicitud({ usuarioId, monto }) {
  const solicitud = new Solicitud({ usuarioId, monto })
  solicitud.cambiarEstado('borrador') 
  return solicitud
}

export default crearSolicitud
