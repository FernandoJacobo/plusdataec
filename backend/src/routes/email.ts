import { Router, Request, Response } from "express";
import nodemailer from 'nodemailer';

import dotenv from 'dotenv';
dotenv.config();

const emailRoutes = Router();

emailRoutes.post("/send", async (req, res) => {
    /* const { name, email, message } = req.body; */

    const name = 'Fernando';
    const email = 'fernandojacobo54@gmail.com';
    const message = 'Test';

    const transporter = nodemailer.createTransport({
        host: "smtp.hostinger.com",
        port: 465, // O usa 587 si estás en desarrollo
        secure: true, // true para 465, false para 587
        auth: {
            user: process.env.MAIL, // Tu correo de Hostinger
            pass: process.env.MAIL_PASS,   // Contraseña del correo
        },
    });

    const mailOptions = {
        from: `"Contacto " <${process.env.MAIL}>`,
        to: "fernandojacobo54@gmail.com",
        subject: "Nuevo mensaje del formulario",
        text: message,
    };

    try {
        await transporter.sendMail(mailOptions);
        res.status(200).json({ success: true, message: "Correo enviado" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Error al enviar correo" });
    }
});

export default emailRoutes;
