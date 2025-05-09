import { Router } from 'express';

import authRoutes from './auth';

import cotizacionesRoutes from './cotizaciones'

import pdfRoutes from './pdf';

import emailRoutes from './email';

import webRoutes from './web/index'

const router = Router();

router.use('/auth', authRoutes);

router.use('/cotizaciones', cotizacionesRoutes);

router.use('/pdf', pdfRoutes);

router.use('/email', emailRoutes);

router.use('/web', webRoutes);


export default router;