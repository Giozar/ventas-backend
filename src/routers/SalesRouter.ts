// routes/SalesRouter.ts

import { Router } from 'express';
import { SalesController } from '../controllers/SalesController';

const router = Router();
const salesController = new SalesController();

// Ruta para registrar una venta
router.post('/sales', salesController.registerSale.bind(salesController));

export default router;
