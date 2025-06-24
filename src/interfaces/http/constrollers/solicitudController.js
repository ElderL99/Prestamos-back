import { crearSolicitud } from '@domain/usecases/crearSolicitud.js'

const crearSolicitudController = (req, res) => {
  try {
    const { usuarioId, monto } = req.body

    if (!usuarioId || !monto) {
      return res.status(400).json({ error: 'usuarioId y monto son requeridos' })
    }

    const solicitud = crearSolicitud({ usuarioId, monto })
    return res.status(201).json({ solicitud })

  } catch (error) {
    return res.status(500).json({ error: error.message })
  }
}

module.exports = {
  crearSolicitudController,
}
