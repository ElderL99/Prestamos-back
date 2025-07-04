import mongoose from 'mongoose'

const historialSchema = new mongoose.Schema({
  estado: { type: String, required: true },
  fecha: { type: Date, required: true, default: Date.now }
})

const documentoSchema = new mongoose.Schema({
  url: String,
  key: String,
  tipo: String,
  fechaSubida: Date
})

const solicitudSchema = new mongoose.Schema({
  // Existente
  usuarioId: { type: String, required: true },
  monto: { type: Number, required: true },
  estado: { type: String, required: true, default: 'borrador' },
  documentos: [documentoSchema],
  historialEstados: [historialSchema],
  fechaCreacion: { type: Date, default: Date.now },
  rechazo: {
    motivo: { type: String },
    fecha: { type: Date }
  },

  // 🔽 Nuevos campos (agrupados por tipo)

  // 🧍 Datos personales
  idPersonal: String,
  empleo: String,
  grado: String,
  nombre: String,
  matricula: String,
  unidad: String,
  zona: String,
  region: String,
  telefono: String,

  // 📆 Datos del servicio
  fechaAlta: Date,
  ultimoAscenso: Date,
  prestamoBanjercito: Boolean,
  pensionAlimenticia: Boolean
})

const SolicitudModel = mongoose.model('Solicitud', solicitudSchema)
export default SolicitudModel
