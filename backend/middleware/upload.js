import multer from 'multer';
import sharp from 'sharp';
import path from 'path';
import { fileURLToPath } from 'url';
import { promises as fs } from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const uploadsDir = path.join(__dirname, '../uploads');

// Ensure uploads directory exists
try {
  await fs.mkdir(uploadsDir, { recursive: true });
} catch (err) {
  console.error('Error creating uploads directory:', err);
}

const storage = multer.memoryStorage();

const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    const allowedMimes = ['image/jpeg', 'image/png', 'image/webp'];
    if (allowedMimes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Only JPEG, PNG, and WebP images are allowed'));
    }
  }
});

export const uploadAndProcessImage = {
  single: (fieldName) => {
    return (req, res, next) => {
      upload.single(fieldName)(req, res, async (err) => {
        if (err) {
          return res.status(400).json({ message: err.message });
        }

        if (req.file) {
          try {
            const filename = `${Date.now()}-${Math.round(Math.random() * 1e9)}.webp`;
            const filepath = path.join(uploadsDir, filename);

            // Crop and resize image to 450x350
            await sharp(req.file.buffer)
              .resize(450, 350, {
                fit: 'cover',
                position: 'center'
              })
              .webp({ quality: 80 })
              .toFile(filepath);

            req.file.filename = filename;
          } catch (error) {
            return res.status(400).json({ message: 'Error processing image: ' + error.message });
          }
        }

        next();
      });
    };
  }
};
