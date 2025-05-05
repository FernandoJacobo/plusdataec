import { Router, Request, Response } from "express";
import nodemailer from "nodemailer";
import multer from "multer";
import fs from "fs";
import path from "path";
import dotenv from "dotenv";

dotenv.config();

const upload = multer({ dest: "uploads/" });
const emailRoutes = Router();

emailRoutes.post("/send", upload.single("archivo"), async (req: Request, res: Response) => {
    const { nombreORazonSocial, nombreEmpresa, correo, numero, rucEmpresa, tipoDeImpuesto, valorASolicitar, interesesGanados, valorNotaDeCredito, honorarios } = req.body;
    const file = req.file;

    if (!process.env.EMAIL || !process.env.EMAIL_PASS) {
        return res.status(500).json({ success: false, message: "Credenciales de correo no configuradas" });
    }

    let htmlTemplate = fs.readFileSync(path.join(__dirname, "../public/email-templates/email-template.html"), "utf8");
    htmlTemplate = htmlTemplate
        .replace("{{nombreORazonSocial}}", nombreORazonSocial || "")
        .replace("{{nombreEmpresa}}", nombreEmpresa || "")
        .replace("{{rucEmpresa}}", rucEmpresa || "")
        .replace("{{tipoDeImpuesto}}", tipoDeImpuesto || "")
        .replace("{{valorASolicitar}}", valorASolicitar || "")
        .replace("{{interesesGanados}}", interesesGanados || "")
        .replace("{{valorNotaDeCredito}}", valorNotaDeCredito || "")
        .replace("{{honorarios}}", honorarios || "")
        .replace("{{correo}}", 'info@plusdata.ec')
        .replace("{{numero}}", '0999677844')
        .replace("{{link}}", '');

    const transporter = nodemailer.createTransport({
        host: "smtp.hostinger.com",
        port: 465,
        secure: true,
        auth: {
            user: process.env.EMAIL,
            pass: process.env.EMAIL_PASS,
        },
        tls: {
            rejectUnauthorized: false,
        },
    });

    const mailOptions = {
        from: `"Formulario Web" <${process.env.EMAIL}>`,
        to: correo,
        subject: "",
        html: htmlTemplate,
        attachments: [
            {
                filename: "logo.png",
                path: path.join(__dirname, "../public/logo.png"),
                cid: "logo_cid",
            },
            ...(file
                ? [{
                    filename: file.originalname,
                    path: file.path,
                }]
                : []),
        ],
    };

    try {
        await transporter.sendMail(mailOptions);
        res.status(200).json({ success: true, message: "Correo enviado exitosamente" });
    } catch (error) {
        console.error("Error al enviar correo:", error);
        res.status(500).json({ success: false, message: "Error al enviar correo" });
    }
});

export default emailRoutes;
