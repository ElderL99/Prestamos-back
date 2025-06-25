import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import solicitudRoutes from './interfaces/http/routes/solicitudRoutes.js'
import { connectDB } from './infra/db/mongoClient.js'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 4000

app.use(cors())
app.use(express.json())

await connectDB() 

app.get('/', (req, res) => {
  res.send('Hola desde el servidor')
})

app.use('/solicitudes', solicitudRoutes)

app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`)
  console.log(`Visita http://localhost:${PORT}`)
})
