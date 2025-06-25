import AWS from 'aws-sdk'
import { v4 as uuidv4 } from 'uuid'
import path from 'path'


const s3 = new AWS.S3({
  region: process.env.AWS_REGION,
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});

/**
 * Sube un archivo a S3
 * @param {Buffer} buffer - el archivo como buffer
 * @param {string} originalName - nombre original del archivo
 * @param {string} folder - carpeta dentro del bucket (ej: "documentos/usuarioId/")
 */
const uploadFile = async (buffer, originalName, folder) => {
  const extension = path.extname(originalName);
  const fileName = `${uuidv4()}${extension}`;
  const key = `${folder}/${fileName}`;

  const params = {
    Bucket: process.env.AWS_BUCKET_NAME,
    Key: key,
    Body: buffer,
    ContentType: getMimeType(extension),
  };

  await s3.putObject(params).promise();

  return {
    key,
    url: `https://${process.env.AWS_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${key}`,
  };
};

/**
 * Elimina un archivo del bucket
 * @param {string} key - ruta del archivo (documentos/usuarioId/nombre.ext)
 */
const deleteFile = async (key) => {
  const params = {
    Bucket: process.env.AWS_BUCKET_NAME,
    Key: key,
  };

  await s3.deleteObject(params).promise();
};

const getMimeType = (ext) => {
  const types = {
    '.pdf': 'application/pdf',
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.png': 'image/png',
  };
  return types[ext.toLowerCase()] || 'application/octet-stream';
};

export { uploadFile,deleteFile}