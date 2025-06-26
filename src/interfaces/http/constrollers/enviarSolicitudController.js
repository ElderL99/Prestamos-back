import SolicitudModel from '../../../infra/db/models/SolicitudModel.js'

export const enviarSolicitudController = async (req, res) => {
  try {
    const { usuarioId } = req.params;

    const solicitud = await SolicitudModel.findOne({ usuarioId });

    if (!solicitud) {
      return res.status(404).json({ error: 'Solicitud no encontrada' });
    }

    if (solicitud.estado !== 'borrador') {
      return res.status(400).json({ error: 'La solicitud ya fue enviada o procesada' });
    }

    solicitud.estado = 'pendiente';
    solicitud.historialEstados.push({ estado: 'pendiente', fecha: new Date() });
    await solicitud.save();

    return res.status(200).json({
      mensaje: 'Solicitud enviada correctamente',
      nuevaSolicitud: solicitud,
    });

  } catch (error) {
    console.error('❌ Error al enviar la solicitud:', error);
    res.status(500).json({ error: 'Error al enviar la solicitud' });
  }
};
