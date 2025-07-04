import listarSolicitudes from '../../../domain/usecases/admin/listarSolicitudes.js'
import cambiarEstadoSolicitud from '../../../domain/usecases/admin/cambiarEstadoSolicitud.js'

export const obtenerTodasLasSolicitudes = async (req, res) => {
  try {
    const solicitudes = await listarSolicitudes()
    res.status(200).json({ solicitudes })
  } catch (error) {
    console.error('❌ Error al listar solicitudes:', error)
    res.status(500).json({ error: 'Error al obtener las solicitudes' })
  }
}

export const actualizarEstadoSolicitud = async (req, res) => {
  try {
    const { usuarioId } = req.params
    const { nuevoEstado, motivo } = req.body

    const solicitud = await cambiarEstadoSolicitud({ usuarioId, nuevoEstado, motivo })

    res.status(200).json({
      mensaje: `Solicitud actualizada a estado '${nuevoEstado}'`,
      solicitud
    })
  } catch (error) {
    console.error('❌ Error al cambiar estado de solicitud:', error)
    res.status(400).json({ error: error.message })
  }
}
