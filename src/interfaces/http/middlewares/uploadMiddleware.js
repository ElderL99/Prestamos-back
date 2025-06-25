import multer from 'multer';

const storage = multer.memoryStorage(); // Guardar en memoria temporalmente

const upload = multer({
  storage,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB máximo por archivo
  },
});

export default upload;
