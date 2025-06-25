import mongoose from 'mongoose'

const historialSchema = new mongoose.Schema({
  estado: { type: String, required: true },
  fecha: { type: Date, required: true, default: Date.now }
})

const solicitudSchema = new mongoose.Schema({
  usuarioId: { type: String, required: true },
  monto: { type: Number, required: true },
  estado: { type: String, required: true, default: 'borrador' },
  documentos: [{ type: String }], // rutas o nombres de archivo
  historialEstados: [historialSchema],
  fechaCreacion: { type: Date, default: Date.now }
})

const SolicitudModel = mongoose.model('Solicitud', solicitudSchema)

export default SolicitudModel
