import { Router, Request, Response } from "express";
import nodemailer from "nodemailer";
import multer from 'multer';
import fs from "fs";
import path from "path";
import type SMTPTransport from "nodemailer/lib/smtp-transport";
import dotenv from "dotenv";
import { LayoutCotizacion } from './web/templates/cotizacion';
import { writeFile, mkdir, access, readFile } from 'fs/promises';
import puppeteer from 'puppeteer';

dotenv.config();
const upload = multer({ dest: "uploads/" });
const routes = Router();

routes.post("/enviar-cotizacion", upload.single("archivo"), async (req: Request, res: Response): Promise<void> => {
    const {
        nombreCompleto, nombreORazonSocial, nombreEmpresa, correo, numero,
        rucEmpresa, tipoDeImpuesto, valorASolicitar, interesesGanados,
        valorNotaDeCredito, honorarios, correoPD, telefonoPD, idCotizacion
    } = req.body;

    const file = req.file;

    if (!process.env.SMTP_SERVER || !process.env.SMTP_PORT || !process.env.EMAIL || !process.env.EMAIL_PASS) {
        res.status(500).json({ success: false, message: 'Credenciales de correo o servidor SMTP no configuradas.' });
        return;
    }

    const nroCotizacion = String(idCotizacion).padStart(9, '0');

    let htmlTemplate = fs.readFileSync(path.join(__dirname, "../public/email-templates/email.html"), "utf8");

    htmlTemplate = htmlTemplate
        .replace("{{nombreORazonSocial}}", nombreCompleto || "")
        .replace("{{nombreEmpresa}}", nombreEmpresa || "")
        .replace("{{rucEmpresa}}", rucEmpresa || "")
        .replace("{{tipoDeImpuesto}}", tipoDeImpuesto || "")
        .replace("{{valorASolicitar}}", valorASolicitar || "")
        .replace("{{interesesGanados}}", interesesGanados || "")
        .replace("{{valorNotaDeCredito}}", valorNotaDeCredito || "")
        .replace("{{honorarios}}", honorarios || "")
        .replace("{{correo}}", correoPD || "")
        .replace("{{numero}}", telefonoPD || "")
        .replace("{{link}}", '');

    // 1. Generar el HTML del PDF
    const html = LayoutCotizacion({
        ...req.body, nombre: nombreCompleto,
        nombreBeneficiario: nombreEmpresa,
        rucBeneficiario: rucEmpresa,
        celular: numero,
        idTiposImpuesto: tipoDeImpuesto,
        correo: correo, id: idCotizacion, correoPD, numeroPD: telefonoPD
    });

    // 2. Crear PDF con Puppeteer
    const browser = await puppeteer.launch({
        headless: true,
        args: ['--no-sandbox', '--disable-setuid-sandbox'],
    });

    const page = await browser.newPage();
    await page.setContent(html, { waitUntil: 'networkidle0', timeout: 0 });
    const pdfBuffer = await page.pdf({ format: 'A4', printBackground: true });

    await browser.close();

    // 3. Guardar PDF (opcional)
    const fileName = `cotizacion-${nroCotizacion}.pdf`;
    const dirPath = path.join(__dirname, '../public', 'cotizaciones');
    await mkdir(dirPath, { recursive: true });
    const filePath = path.join(dirPath, fileName);
    await writeFile(filePath, pdfBuffer);
    await access(filePath);

    const transporter = nodemailer.createTransport({
        host: process.env.SMTP_SERVER,
        port: parseInt(process.env.SMTP_PORT),
        secure: true,
        auth: {
            user: process.env.EMAIL,
            pass: process.env.EMAIL_PASS,
        },
        tls: {
            rejectUnauthorized: false,
        },
    } as SMTPTransport.Options);

    const attachments = [
        {
            filename: "logo.png",
            path: path.join(__dirname, "../public/logo.png"),
            cid: "logo_cid",
        },
        {
            filename: fileName,
            content: pdfBuffer,
            contentType: "application/pdf",
        }
    ];

    const mailOptions = {
        from: `"PLUSDATA ECUADOR S.A." <${process.env.EMAIL}>`,
        to: correo,
        subject: `Cotización trámite devolución impuestos Nro. ${nroCotizacion} PLUSDATA ECUADOR S.A.`,
        html: htmlTemplate,
        attachments,
    };

    try {
        transporter.sendMail(mailOptions);
        res.status(200).json({
            success: true,
            message: "Correo enviado exitosamente. Revisa tu correo, te hemos enviado la cotización y te estaremos contactando para brindarte la mejor asesoría"
        });
    } catch (error) {
        console.error("Error al enviar correo:", error);
        res.status(500).json({ success: false, message: "Error al enviar correo" });
    }
});

export default routes;
