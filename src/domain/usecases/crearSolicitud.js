import Solicitud from '../entities/Solicitud.js'
import { guardarSolicitud } from '../../infra/db/repositories/guardarSolicitud.js'

export default async function crearSolicitud({
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
}) {
  const solicitud = new Solicitud({
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

  solicitud.cambiarEstado('borrador');

  const guardada = await guardarSolicitud(solicitud);
  return guardada;
}
