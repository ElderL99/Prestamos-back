import crearSolicitud from './src/domain/usecases/crearSolicitud.js'


const nuevaSolicitud = crearSolicitud({
  usuarioId: 'abc123',
  monto: 5000,
})

console.log(nuevaSolicitud)
