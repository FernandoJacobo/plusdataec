import { Router, Request, Response } from 'express';
import { LayoutCotizacion } from './web/templates/cotizacion';
import { writeFile, mkdir } from 'fs/promises';
import path from 'path';
import puppeteer from 'puppeteer';
import { db } from '../database';
import pdf from 'pdf-parse';

const router = Router();

router.post('/register', async (req: Request, res: Response) => {
    const {
        idEstatus,
        idTiposImpuesto,
        valorASolicitar,
        honorarios,
        nombre,
        correo,
        celular,
        nombreBeneficiario,
        rucBeneficiario,
    } = req.body;

    if (
        !idEstatus || !idTiposImpuesto || !valorASolicitar || !honorarios ||
        !nombre || !correo || !celular || !nombreBeneficiario || !rucBeneficiario
    ) {
        return res.status(400).json({ error: true, message: 'Faltan campos obligatorios' });
    }

    try {
        // 1. Guardar en BD
        await db.query(
            'INSERT INTO cotizaciones (idEstatus, idTiposImpuesto, valorASolicitar, honorarios, nombre, correo, celular, nombreBeneficiario, rucBeneficiario) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
            [idEstatus, idTiposImpuesto, valorASolicitar, honorarios, nombre, correo, celular, nombreBeneficiario, rucBeneficiario]
        );

        // 2. Generar HTML dinámico
        const html = LayoutCotizacion(req.body);

        // 3. Generar PDF con Puppeteer
        const browser = await puppeteer.launch({
            headless: "new",
            args: ["--no-sandbox", "--disable-setuid-sandbox"]
        });
        const page = await browser.newPage();
        await page.setContent(html, { waitUntil: 'networkidle0', timeout: 0 });

        const pdfBuffer = await page.pdf({ format: 'A4', printBackground: true });
        await browser.close();

        const extracted = await pdf(pdfBuffer);

        // 4. Guardar PDF en carpeta pública
        const fileName = `cotizacion-${Date.now()}.pdf`;
        const dirPath = path.join(__dirname, "../public/", 'cotizaciones');
        await mkdir(dirPath, { recursive: true });
        const filePath = path.join(dirPath, fileName);
        await writeFile(filePath, pdfBuffer);

        // 5. Convertir a Base64 correctamente
        const pdfBase64 = pdfBuffer.toString('base64');

        // 6. Devolver URL relativa y Base64
        res.status(201).json({
            error: false,
            message: 'Cotización registrada y PDF generado',
            downloadUrl: `/cotizaciones/${fileName}`,
            pdfBase64
        });

    } catch (error) {
        console.error('Error al registrar cotización:', error);
        res.status(500).json({ error: true, message: 'Error interno del servidor' });
    }
});

export default router;
