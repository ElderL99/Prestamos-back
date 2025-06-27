// src/infra/storage/uploadFile.js
import AWS from 'aws-sdk'
import { v4 as uuidv4 } from 'uuid'
import path from 'path'
import dotenv from 'dotenv'
dotenv.config()

const s3 = new AWS.S3({
  region: process.env.AWS_REGION,
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
})

const uploadFile = async (buffer, originalName, folder) => {
  const extension = path.extname(originalName)
  const fileName = `${uuidv4()}${extension}`
  const key = `${folder}/${fileName}`

  const params = {
    Bucket: process.env.AWS_BUCKET_NAME,
    Key: key,
    Body: buffer,
    ContentType: getMimeType(extension),
    ACL: 'private',
  }

  await s3.putObject(params).promise()

  return {
    key,
    url: `https://${process.env.AWS_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${key}`,
  }
}

const getMimeType = (ext) => {
  const types = {
    '.pdf': 'application/pdf',
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.png': 'image/png',
  }
  return types[ext.toLowerCase()] || 'application/octet-stream'
}

export default uploadFile
