import crearSolicitud from '../../../domain/usecases/crearSolicitud.js'

export const crearSolicitudController = async (req, res) => {
  try {
    const {
      usuarioId,
      monto,
      idPersonal,
      empleo,
      grado,
      nombre,
      matricula,
      unidad,
      zona,
      region,
      telefono,
      fechaAlta,
      ultimoAscenso,
      prestamoBanjercito,
      pensionAlimenticia
    } = req.body;

    if (!usuarioId || !monto) {
      return res.status(400).json({ error: 'usuarioId y monto son requeridos' });
    }

    const solicitud = await crearSolicitud({
      usuarioId,
      monto,
      idPersonal,
      empleo,
      grado,
      nombre,
      matricula,
      unidad,
      zona,
      region,
      telefono,
      fechaAlta,
      ultimoAscenso,
      prestamoBanjercito,
      pensionAlimenticia
    });

    return res.status(201).json({ mensaje: 'Solicitud creada correctamente', solicitud });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
