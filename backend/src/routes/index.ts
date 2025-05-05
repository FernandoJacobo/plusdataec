import { Router } from 'express';
import authRoutes from './auth';
import pdfRoutes from './pdf';
import emailRoutes from './email';

const router = Router();

router.use('/auth', authRoutes);
router.use('/pdf', pdfRoutes);
router.use('/email', emailRoutes);

export default router;