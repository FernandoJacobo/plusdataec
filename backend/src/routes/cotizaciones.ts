import { Router, Request, Response } from 'express';
import { LayoutCotizacion } from './web/templates/cotizacion'; // asegúrate de que devuelva HTML como string
import { writeFile, mkdir, readFile } from 'fs/promises'; // Importa readFile
import path from 'path';
import puppeteer from 'puppeteer';
import { db } from '../database';

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
        const html = LayoutCotizacion(req.body); // debe retornar un string HTML completo

        // 3. Generar PDF con Puppeteer
        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        await page.setContent(html, { waitUntil: 'networkidle0' });

        const pdfBuffer = await page.pdf({ format: 'A4' });
        await browser.close();

        // 4. Guardar PDF en carpeta pública
        const fileName = `cotizacion-${Date.now()}.pdf`;
        const dirPath = path.join(__dirname, "../public/", 'contizaciones');
        await mkdir(dirPath, { recursive: true });
        const filePath = path.join(dirPath, fileName);
        await writeFile(filePath, pdfBuffer);

        // 5. Leer el archivo PDF guardado para convertirlo a Base64
        const pdfBase64 = pdfBuffer.toString();

        // 6. Devolver la URL para el correo y el Base64 para la descarga inmediata
        res.status(201).json({
            error: false,
            message: 'Cotización registrada y PDF generado',
            downloadUrl: path.join(__dirname, "../public/", 'contizaciones') + fileName, // URL para el correo
            pdfBase64: btoa(pdfBase64), // Contenido Base64 para descarga inmediata
        });
    } catch (error: any) {
        console.error('Error al registrar cotización:', error);
        res.status(500).json({ error: true, message: 'Error interno del servidor' });
    }
});

export default router;