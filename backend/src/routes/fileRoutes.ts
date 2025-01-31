// backend/routes/fileRoutes.ts
import  express from 'express';
import multer from 'multer';
import { uploadFile } from '../controllers/fileControlers';

const router = express.Router();
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
      cb(null, `${Date.now()}-${file.originalname}`);
    }
  });
  
  const upload = multer({
    storage: storage,
    limits: { fileSize: 10 * 1024 * 1024 }, // 10MB limit
    fileFilter: (req, file, cb) => {
      if (!file.originalname.match(/\.(xlsx)$/)) {
        return cb(new Error('Only .xlsx files are allowed!'));
      }
      cb(null, true);
    }
  });
  

router.post('/upload', upload.single('file'), uploadFile);
export default router;


