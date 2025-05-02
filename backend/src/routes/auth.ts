import { Router, Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { db } from '../database';

const router = Router();

const JWT_SECRET = process.env.JWT_SECRET!;
if (!JWT_SECRET) {
  throw new Error('Falta definir JWT_SECRET en el archivo .env');
}

// Registro de usuario
router.post('/register', async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Email y contraseña son requeridos' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    await db.query(
      'INSERT INTO users (email, password) VALUES (?, ?)',
      [email, hashedPassword]
    );

    res.status(201).json({ message: 'Usuario registrado correctamente' });
  } catch (error: any) {
    res.status(500).json({ message: 'Error en el registro', error: error.message });
  }
});

// Login de usuario
router.post('/login', async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Email y contraseña son requeridos' });
    }

    const [rows]: any = await db.query(
      'SELECT * FROM users WHERE email = ?',
      [email]
    );
    const user = rows[0];

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ message: 'Credenciales inválidas' });
    }

    const token = jwt.sign({ id: user.id }, JWT_SECRET, { expiresIn: '1h' });

    res.json({ token });
  } catch (error: any) {
    res.status(500).json({ message: 'Error en el login', error: error.message });
  }
});

router.get('/users', async (req: Request, res: Response) => {
  try {
   const [rows]: any = await db.query('SELECT * FROM users');

    const users = rows;

    res.status(201).json({ message: '', users });
  } catch (error: any) {
    res.status(500).json({ message: 'Error en el registro', error: error.message });
  }
});

export default router;
