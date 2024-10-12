// controllers/SalesController.ts

import { Request, Response } from 'express';
import { SalesService } from '../services/SalesService';
import { SaleModel } from '../models/SaleModel';

const salesService = new SalesService();

export class SalesController {
    public async registerSale(req: Request, res: Response): Promise<void> {
        const sale: SaleModel = { 
            ...req.body,
            date: new Date().toISOString() // Agregar fecha actual a la venta
        };

        try {
            const createdSale = await salesService.createSale(sale);
            res.status(201).json(createdSale); // Retornar la venta creada
        } catch (error) {
            console.error('Error al registrar la venta:', error);
            res.status(500).json({ message: 'Error al registrar la venta' });
        }
    }
}
