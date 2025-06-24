class Solicitud {
  constructor({
    id,
    usuarioId,
    monto,
    estado = 'borrador',
    documentos = [],
    historialEstados = [],
    fechaCreacion = new Date(),
  }) {
    if (!usuarioId) throw new Error('El campo usuarioId es obligatorio')
    if (!monto || monto <= 0) throw new Error('El monto debe ser mayor a 0')

    this.id = id || crypto.randomUUID()
    this.usuarioId = usuarioId
    this.monto = monto
    this.estado = estado
    this.documentos = documentos
    this.historialEstados = historialEstados
    this.fechaCreacion = fechaCreacion
  }

  agregarDocumento(documento) {
    if (this.estado !== 'borrador') {
      throw new Error('No se pueden subir documentos si la solicitud no está en estado borrador')
    }
    this.documentos.push(documento)
  }

  cambiarEstado(nuevoEstado) {
    const estadosPermitidos = ['borrador', 'pendiente', 'aprobado', 'rechazado']
    if (!estadosPermitidos.includes(nuevoEstado)) {
      throw new Error(`Estado inválido: ${nuevoEstado}`)
    }

    this.estado = nuevoEstado
    this.historialEstados.push({
      estado: nuevoEstado,
      fecha: new Date(),
    })
  }
}

export default Solicitud;
