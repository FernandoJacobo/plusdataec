import { Router, Request, Response } from "express";

import { db } from '../../database'

import nodemailer from "nodemailer";

import fs from "fs";

import path from "path";

import type SMTPTransport from "nodemailer/lib/smtp-transport";

import dotenv from "dotenv";

dotenv.config();

const router = Router();

const JWT_SECRET = process.env.JWT_SECRET
if (!JWT_SECRET) {
    throw new Error('Falta definir JWT_SECRET en el archivo .env')
}

// Obtener rangos de honorarios
router.get('/honorarios', async (req: Request, res: Response) : Promise<void> => {
    try {
        const [rows] = await db.query('SELECT * FROM honorarios')
        res.status(200).json({ data: rows })
    } catch (error: any) {
        res.status(500).json({ message: 'Error al consultar rangos de honorarios', error: error.message })
    }
});

// Obtener Tipos de Impuesto
router.get('/tiposimpuesto', async (req: Request, res: Response) : Promise<void> => {
    try {
        const [rows] = await db.query('SELECT * FROM tiposimpuesto')

        const options = (rows as any[]).map((row) => ({
            value: row.id,
            label: row.nombre
        }))

        res.status(200).json({ data: options })
    } catch (error: any) {
        res.status(500).json({ message: 'Error al consultar rangos de honorarios', error: error.message })
    }
});

// Enviar mensaje
router.post('/enviar-mensaje', async (req: Request, res: Response) : Promise<void> => {
    try {
        const { nombre, correo, celular, mensaje } = req.body;

        if (!nombre || !correo || !celular || !mensaje) {
            res.status(500).json({ error: true, message: 'Faltan campos obligatorios' })
            return
        }

        if (!process.env.SMTP_SERVER || !process.env.SMTP_PORT) {
            res.status(500).json({ error: true, message: 'Credenciales del servidor SMTP no configuradas.' });
            return
        }

        if (!process.env.EMAIL || !process.env.EMAIL_PASS) {
            res.status(500).json({ error: true, message: 'Credenciales de correo no configuradas.' });
            return
        }

        let htmlTemplate = fs.readFileSync(path.join(__dirname, "../../public/email-templates/message.html"), "utf8");

        htmlTemplate = htmlTemplate
        .replace("{{nombre}}", nombre || "")
        .replace("{{mensaje}}", mensaje || "")

        const transporter = nodemailer.createTransport({
            host: process.env.SMTP_SERVER,
            port: parseInt(process.env.SMTP_PORT || "465", 10),
            secure: true,
            auth: {
                user: process.env.EMAIL,
                pass: process.env.EMAIL_PASS,
            },
            tls: {
                rejectUnauthorized: false,
            },
        } as SMTPTransport.Options);

        const mailOptions = {
            from: `"PLUSDATA ECUADOR S.A." <${process.env.EMAIL}>`,
            to: process.env.EMAIL,
            cc: correo,
            subject: `Notificacion de mensaje recibido - PLUSDATA ECUADOR S.A.`,
            html: htmlTemplate,
            attachments: [
                {
                    filename: "logo.png",
                    path: path.join(__dirname, "../../public/logo.png"),
                    cid: "logo_cid",
                }
            ],
        };

        try {
            await transporter.sendMail(mailOptions);
            res.status(200).json({ error: false, message: "Correo enviado exitosamente" });
        } catch (error) {
            console.error("Error al enviar correo:", error);
            res.status(500).json({ error: true, message: "Error al enviar correo" });
        }
    } catch (error: any) {
        res.status(500).json({ message: 'Error al consultar rangos de honorarios', error: error.message })
    }
});

router.post('/registrar-mensaje', async (req: Request, res: Response) : Promise<void> => {
    const { nombre, correo, celular, mensaje } = req.body;

    if (!nombre || !correo || !celular || !mensaje) {
        res.status(500).json({ error: true, message: 'Faltan campos obligatorios' })
        return
    }

    try {
        const result = await db.query(
            'INSERT INTO mensajes (nombre, correo, celular, mensaje) VALUES (?, ?, ?, ?)', [nombre, correo, celular, mensaje]
        )

        res.status(201).json({ error: false, message: 'Mensaje guardado.' })
    } catch (error: any) {
        res.status(500).json({ error: true, message: error.message })
    }
})

export default router