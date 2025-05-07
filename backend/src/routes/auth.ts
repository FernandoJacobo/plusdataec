import { Router, Request, Response } from 'express'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { db } from '../database' // Ajusta según tu estructura

const router = Router()
const JWT_SECRET = process.env.JWT_SECRET!

if (!JWT_SECRET) {
    throw new Error('Debes definir JWT_SECRET en tu archivo .env')
}

// Registro de usuario
router.post('/register', async (req: Request, res: Response) => {
    const { nombre, celular, correo, contrasena } = req.body

    if (!nombre || !celular || !correo ! || !contrasena) {
        return res.status(400).json({ error: true, message: 'Faltan campos obligatorios' })
    }

    try {
        const [existingUser]: any = await db.query(
            'SELECT * FROM usuarios WHERE correo = ?',
            [correo]
        )

        if (existingUser.length > 0) {
            return res.status(409).json({ error: true, message: 'El usuario ya existe' })
        }

        const hashedPassword = await bcrypt.hash(contrasena, 10);

        await db.query(
            'INSERT INTO usuarios (nombre, celular, correo, contrasena) VALUES (?, ?, ?, ?)',
            [nombre, celular, correo, hashedPassword]
        )

        const token = jwt.sign({ correo }, JWT_SECRET, { expiresIn: '1d' })

        res.status(201).json({ error: false, message: 'Usuario registrado', token })
    } catch (error: any) {
        res.status(500).json({ error: true, message: error.message })
    }
})

// Login
router.post('/login', async (req: Request, res: Response) => {
    const { email, password } = req.body

    if (!email || !password) {
        return res.status(400).json({ message: 'Faltan campos obligatorios' })
    }

    try {
        const [rows]: any = await db.query('SELECT * FROM usuarios WHERE email = ?', [email])

        const user = rows[0]

        if (!user) {
            return res.status(401).json({ message: 'Credenciales inválidas' })
        }

        const isMatch = await bcrypt.compare(password, user.password)

        if (!isMatch) {
            return res.status(401).json({ message: 'Credenciales inválidas' })
        }

        const token = jwt.sign({ email: user.email }, JWT_SECRET, { expiresIn: '7d' })

        res.status(200).json({ message: 'Login exitoso', token })
    } catch (error: any) {
        res.status(500).json({ message: 'Error en el login', error: error.message })
    }
})

// Verificación de token
router.get('/verify-token', (req: Request, res: Response) => {
    const authHeader = req.headers.authorization

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'Token no proporcionado' })
    }

    const token = authHeader.split(' ')[1]

    try {
        const decoded = jwt.verify(token, JWT_SECRET)
        res.status(200).json({ message: 'Token válido', decoded })
    } catch (error: any) {
        res.status(401).json({ message: 'Token inválido o expirado', error: error.message })
    }
})

export default router
