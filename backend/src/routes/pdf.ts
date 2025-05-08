import { Router, Request, Response } from "express";
import puppeteer from "puppeteer";

const routes = Router();

routes.post("/cotizacion", async (req, res) => {
    const { htmlContent } = req.body;

    try {
        const browser = await puppeteer.launch({
            headless: "new",
            args: ["--no-sandbox", "--disable-setuid-sandbox"],
        });
        const page = await browser.newPage();
        await page.setContent(htmlContent, { waitUntil: "networkidle0" });

        const pdfBuffer = await page.pdf({ format: "A4" });

        await browser.close();

        res.set({
            "Content-Type": "application/pdf",
            "Content-Disposition": "attachment; filename=documento.pdf",
            "Content-Length": pdfBuffer.length,
        });

        res.send(pdfBuffer);
    } catch (err) {
        console.error(err);
        res.status(500).send("Error al generar el PDF");
    }
});

export default routes;
