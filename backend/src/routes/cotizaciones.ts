import { Router, Request, Response } from 'express';

import { LayoutCotizacion } from './templates/cotizacion';

import { writeFile, mkdir, access, readFile } from 'fs/promises';

import path from 'path';

import puppeteer from 'puppeteer';

import { db } from '../database';

const router = Router();

router.post('/register', async (req: Request, res: Response) : Promise<void> => {
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

    try {
        const [result]: any = await db.query(
            `INSERT INTO cotizaciones 
            (idEstatus, idTiposImpuesto, valorASolicitar, honorarios, nombre, correo, celular, nombreBeneficiario, rucBeneficiario) 
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            [idEstatus, idTiposImpuesto, valorASolicitar, honorarios, nombre, correo, celular, nombreBeneficiario, rucBeneficiario]
        );

        res.status(201).json({
            error: false,
            message: 'Cotización registrada y PDF generado',
            id: result.insertId,
        });
    } catch (error: any) {
        console.error('Error al registrar cotización:', error.message);

        res.status(500).json({
            error: true,
            message: 'Error interno del servidor',
            details: error.message,
        });
    }
});

router.post('/update', async (req: Request, res: Response) : Promise<void> => {
    const {
        id,
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

    try {
        // 1. Insertar en la base de datos
        const [result]: any = await db.query(
            `UPDATE cotizaciones SET
            idEstatus = ?,
            idTiposImpuesto = ?,
            valorASolicitar = ?,
            honorarios = ?,
            nombre = ?,
            correo = ?,
            celular = ?,
            nombreBeneficiario = ?,
            rucBeneficiario = ?
            WHERE id = ? `,
            [idEstatus, idTiposImpuesto, valorASolicitar, honorarios, nombre, correo, celular, nombreBeneficiario, rucBeneficiario, id]
        );

        // 2. Responder con éxito
        res.status(201).json({
            error: false,
            message: 'Cotización actualizada',
            id: id,
        });

    } catch (error: any) {
        console.error('Error al registrar cotización:', error.message);
        res.status(500).json({
            error: true,
            message: 'Error interno del servidor',
            details: error.message,
        });
    }
});

router.post('/confirm', async (req: Request, res: Response) : Promise<void> => {
    const {
        id,
        idEstatus,
        idTiposImpuesto,
        valorASolicitar,
        honorarios,
        nombre,
        correo,
        celular,
        nombreBeneficiario,
        rucBeneficiario,
        correoPD,
        numeroPD,
    } = req.body;

    // Validación básica
    if (
        !idEstatus || !idTiposImpuesto || !valorASolicitar || !honorarios ||
        !nombre || !correo || !celular || !nombreBeneficiario || !rucBeneficiario
    ) {
        res.status(400).json({
            error: true,
            message: 'Faltan uno o más campos obligatorios',
        });
        return
    }

    try {
        // 1. Insertar en la base de datos
        const [result]: any = await db.query(
            `UPDATE cotizaciones SET 
            idEstatus = ?,
            idTiposImpuesto = ?,
            valorASolicitar = ?,
            honorarios = ?,
            nombre = ?,
            correo = ?,
            celular = ?,
            nombreBeneficiario = ?,
            rucBeneficiario = ?
            WHERE id = ? `,
            [idEstatus, idTiposImpuesto, valorASolicitar, honorarios, nombre, correo, celular, nombreBeneficiario, rucBeneficiario, id]
        );

        const nroCotizacion = String(id).padStart(9, '0');

        // 2. Generar el HTML del PDF
        const html = LayoutCotizacion({ ...req.body, id: id, correoPD: correoPD, numeroPD: numeroPD });

        // 3. Crear PDF con Puppeteer
        const browser = await puppeteer.launch({
            headless: true,
            args: ['--no-sandbox', '--disable-setuid-sandbox'],
        });

        const page = await browser.newPage();
        await page.setContent(html, { waitUntil: 'networkidle0', timeout: 0 });
        const pdfBuffer = await page.pdf({ format: 'A4', printBackground: true });
        await browser.close();

        // 4. Guardar el archivo PDF
        const fileName = `Cotización ${nroCotizacion} PLUSDATA.EC.pdf`;
        const dirPath = path.join(__dirname, '../public', 'cotizaciones');
        await mkdir(dirPath, { recursive: true });
        const filePath = path.join(dirPath, fileName);
        await writeFile(filePath, pdfBuffer);
        await access(filePath);

        // 5. Leer archivo en base64
        const savedPdf = await readFile(filePath);
        const pdfBase64 = savedPdf.toString('base64');

        // 6. Responder con éxito
        res.status(201).json({
            error: false,
            message: 'Gracias por confiar en PLUSDATA.EC. Enseguida nos pondremos en contacto contigo para avanzar con el proceso.',
            id: id,
            fileName,
            downloadUrl: `/cotizaciones/${fileName}`,
            pdfBase64,
        });

    } catch (error: any) {
        console.error('Error al registrar cotización:', error.message);
        res.status(500).json({
            error: true,
            message: 'Error interno del servidor',
            details: error.message,
        });
    }
});

export default router;