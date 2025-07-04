export default class Solicitud {
  constructor({
    id,
    usuarioId,
    monto,
    estado = 'borrador',
    documentos = [],
    historialEstados = [],
    fechaCreacion = new Date(),

    // nuevos campos obligatorios
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
    // Validaciones obligatorias
    if (!usuarioId) throw new Error('El campo usuarioId es obligatorio')
    if (!monto || monto <= 0) throw new Error('El monto debe ser mayor a 0')
    if (!idPersonal) throw new Error('El campo idPersonal es obligatorio')
    if (!empleo) throw new Error('El campo empleo es obligatorio')
    if (!grado) throw new Error('El campo grado es obligatorio')
    if (!nombre) throw new Error('El campo nombre es obligatorio')
    if (!matricula) throw new Error('El campo matricula es obligatorio')
    if (!unidad) throw new Error('El campo unidad es obligatorio')
    if (!zona) throw new Error('El campo zona es obligatorio')
    if (!region) throw new Error('El campo region es obligatorio')
    if (!telefono) throw new Error('El campo telefono es obligatorio')
    if (!fechaAlta) throw new Error('El campo fechaAlta es obligatorio')
    if (!ultimoAscenso) throw new Error('El campo ultimoAscenso es obligatorio')
    if (prestamoBanjercito === undefined) throw new Error('El campo prestamoBanjercito es obligatorio')
    if (pensionAlimenticia === undefined) throw new Error('El campo pensionAlimenticia es obligatorio')

    // Asignación
    this.id = id || crypto.randomUUID?.() || Math.random().toString(36).slice(2)
    this.usuarioId = usuarioId
    this.monto = monto
    this.estado = estado
    this.documentos = documentos
    this.historialEstados = historialEstados
    this.fechaCreacion = fechaCreacion

    this.idPersonal = idPersonal
    this.empleo = empleo
    this.grado = grado
    this.nombre = nombre
    this.matricula = matricula
    this.unidad = unidad
    this.zona = zona
    this.region = region
    this.telefono = telefono
    this.fechaAlta = fechaAlta
    this.ultimoAscenso = ultimoAscenso
    this.prestamoBanjercito = prestamoBanjercito
    this.pensionAlimenticia = pensionAlimenticia
  }

  cambiarEstado(nuevoEstado) {
    const estadosPermitidos = ['borrador', 'pendiente', 'aprobado', 'rechazado']
    if (!estadosPermitidos.includes(nuevoEstado)) {
      throw new Error(`Estado inválido: ${nuevoEstado}`)
    }

    this.estado = nuevoEstado
    this.historialEstados.push({ estado: nuevoEstado, fecha: new Date() })
  }

  agregarDocumento(documento) {
    if (this.estado !== 'borrador') {
      throw new Error('No puedes subir documentos si no está en estado borrador')
    }
    this.documentos.push(documento)
  }
}
