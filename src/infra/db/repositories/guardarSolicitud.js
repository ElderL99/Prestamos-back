import SolicitudModel from '../models/SolicitudModel.js'

export async function guardarSolicitud(solicitudEntidad) {
  const nuevaSolicitud = new SolicitudModel({
    usuarioId: solicitudEntidad.usuarioId,
    monto: solicitudEntidad.monto,
    estado: solicitudEntidad.estado,
    documentos: solicitudEntidad.documentos,
    historialEstados: solicitudEntidad.historialEstados,
    fechaCreacion: solicitudEntidad.fechaCreacion,

    // Nuevos campos
    idPersonal: solicitudEntidad.idPersonal,
    empleo: solicitudEntidad.empleo,
    grado: solicitudEntidad.grado,
    nombre: solicitudEntidad.nombre,
    matricula: solicitudEntidad.matricula,
    unidad: solicitudEntidad.unidad,
    zona: solicitudEntidad.zona,
    region: solicitudEntidad.region,
    telefono: solicitudEntidad.telefono,
    fechaAlta: solicitudEntidad.fechaAlta,
    ultimoAscenso: solicitudEntidad.ultimoAscenso,
    prestamoBanjercito: solicitudEntidad.prestamoBanjercito,
    pensionAlimenticia: solicitudEntidad.pensionAlimenticia
  })

  const resultado = await nuevaSolicitud.save()
  return resultado
}
