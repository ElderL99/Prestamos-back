import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import solicitudRoutes from './interfaces/http/routes/solicitudRoutes.js'
import { connectDB } from './infra/db/mongoClient.js'
import adminRoutes from './interfaces/http/routes/adminRoutes.js'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 4000

// Middlewares
app.use(cors())
app.use(express.json())

// Conexión a la base de datos
await connectDB()

// Rutas
app.use('/solicitudes', solicitudRoutes)
app.use('/admin', adminRoutes)

// Ruta raíz opcional
app.get('/', (req, res) => {
  res.send('Servidor de préstamos funcionando')
})

// Inicio del servidor
app.listen(PORT, () => {
  console.log(`✅ Servidor corriendo en el puerto ${PORT}`)
  console.log(`🌐 http://localhost:${PORT}`)
})
