import { Router, Request, Response } from 'express';

import jwt from 'jsonwebtoken';

import { db } from '../database';

const router = Router();

const JWT_SECRET = process.env.JWT_SECRET!;

if (!JWT_SECRET) {
    throw new Error('Debes definir JWT_SECRET en tu archivo .env');
}

// Registro de cotizaciones
router.post('/register', async (req: Request, res: Response) => {
    const { idEstatus, idTiposImpuesto, valorASolicitar, honorarios, nombre, correo, celular, nombreBeneficiario, rucBeneficiario } = req.body

    if (!idEstatus || !idTiposImpuesto || !valorASolicitar || !honorarios || !nombre || !correo || !celular || !nombreBeneficiario || !rucBeneficiario) {
        return res.status(400).json({ error: true, message: 'Faltan campos obligatorios' })
    }

    try {
        const result = await db.query(
            'INSERT INTO cotizaciones (idEstatus, idTiposImpuesto, valorASolicitar, honorarios, nombre, correo, celular, nombreBeneficiario, rucBeneficiario) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
            [idEstatus, idTiposImpuesto, valorASolicitar, honorarios, nombre, correo, celular, nombreBeneficiario, rucBeneficiario]
        )

        res.status(201).json({ error: false, message: 'Cotización registrada' })
    } catch (error: any) {
        res.status(500).json({ error: true, message: error.message })
    }
});

export default router;