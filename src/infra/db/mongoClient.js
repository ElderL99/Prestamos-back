import mongoose from 'mongoose'
import dotenv from 'dotenv'

dotenv.config()

export async function connectDB() {
  try {
    await mongoose.connect(process.env.MONGO_URI)
    console.log('✅ Conectado a MongoDB Atlas')
  } catch (error) {
    console.error('❌ Error al conectar a Mongo:', error.message)
    process.exit(1) // Detiene el servidor si falla la conexión
  }
}
