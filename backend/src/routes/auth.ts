import { Router, Request, Response } from 'express'

import bcrypt from 'bcryptjs'

import jwt from 'jsonwebtoken'

import { db } from '../database'

const router = Router();

const JWT_SECRET = process.env.JWT_SECRET!

if (!JWT_SECRET) {
    throw new Error('Debes definir JWT_SECRET en tu archivo .env')
}

// Registro de usuario
router.post('/register', async (req: Request, res: Response) : Promise<void> => {
    const { idEstatus, nombre, celular, correo, contrasena } = req.body;

    if (!nombre || !celular || !correo || !contrasena) {
        res.status(400).json({ error: true, message: 'Faltan campos obligatorios' });
        return;
    }

    try {
        const [existingUser]: any = await db.query(
            'SELECT * FROM usuarios WHERE correo = ?',
            [correo]
        );

        if (existingUser.length > 0) {
            res.status(409).json({ error: true, message: 'El usuario ya existe' });
            return;
        }

        const hashedPassword = await bcrypt.hash(contrasena, 10);

        await db.query(
            'INSERT INTO usuarios (idEstatus, nombre, celular, correo, contrasena) VALUES (?, ?, ?, ?, ?)',
            [idEstatus, nombre, celular, correo, hashedPassword]
        );

        const token = jwt.sign({ correo }, JWT_SECRET, { expiresIn: '1d' });

        res.status(201).json({ error: false, message: 'Usuario registrado', token });
    } catch (error: any) {
        res.status(500).json({ error: true, message: error.message });
    }
});

// Login
router.post('/login', async (req: Request, res: Response) : Promise<void> => {
    const { email, password } = req.body

    if (!email || !password) {
        res.status(400).json({ message: 'Faltan campos obligatorios' })
        return
    }

    try {
        const [rows]: any = await db.query('SELECT * FROM usuarios WHERE email = ?', [email])

        const user = rows[0]

        if (!user) {
            res.status(401).json({ message: 'Credenciales inválidas' })
            return
        }

        const isMatch = await bcrypt.compare(password, user.password)

        if (!isMatch) {
            res.status(401).json({ message: 'Credenciales inválidas' })
            return
        }

        const token = jwt.sign({ email: user.email }, JWT_SECRET, { expiresIn: '7d' })

        res.status(200).json({ message: 'Login exitoso', token })
    } catch (error: any) {
        res.status(500).json({ message: 'Error en el login', error: error.message })
    }
});

// Verificación de token
router.get('/verify-token', async (req: Request, res: Response) : Promise<void> => {
    const authHeader = req.headers.authorization

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        res.status(401).json({ message: 'Token no proporcionado' })
        return
    }

    const token = authHeader.split(' ')[1]

    try {
        const decoded = jwt.verify(token, JWT_SECRET)
        res.status(200).json({ message: 'Token válido', decoded })
    } catch (error: any) {
        res.status(401).json({ message: 'Token inválido o expirado', error: error.message })
    }
});

export default router;