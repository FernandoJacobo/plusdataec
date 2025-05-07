import { Router, Request, Response } from 'express'
import { db } from '../../database'

const router = Router()

const JWT_SECRET = process.env.JWT_SECRET
if (!JWT_SECRET) {
    throw new Error('Falta definir JWT_SECRET en el archivo .env')
}

// Obtener rangos de honorarios
router.get('/honorarios', async (req: Request, res: Response) => {
    try {
        const [rows] = await db.query('SELECT * FROM rangoshonorarios')
        res.status(200).json({ data: rows })
    } catch (error: any) {
        res.status(500).json({ message: 'Error al consultar rangos de honorarios', error: error.message })
    }
})

// Obtener Tipos de Impuesto
router.get('/tiposimpuesto', async (req: Request, res: Response) => {
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
})

export default router
