import SolicitudModel from '../../../infra/db/models/SolicitudModel.js'

export default async function listarSolicitudes() {
  return await SolicitudModel.find().sort({ fechaCreacion: -1 }) // últimas primero
}