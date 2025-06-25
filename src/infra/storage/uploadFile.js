import s3 from './s3Client.js'
import { v4 as uuidv4 } from 'uuid'
import dotenv from 'dotenv'
dotenv.config()

export const subirDocumento = async (archivoBuffer, nombreOriginal, mimeType) => {
  const params = {
    Bucket: process.env.AWS_BUCKET_NAME,
    Key: `${uuidv4()}-${nombreOriginal}`,
    Body: archivoBuffer,
    ContentType: mimeType,
    ACL: 'private', // o 'public-read' si quieres que sea accesible públicamente
  }

  const subida = await s3.upload(params).promise()
  return subida.Location // URL del archivo en S3
}
