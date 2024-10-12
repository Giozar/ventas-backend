// routes/ProductsRouter.ts

import { Router } from 'express';
import { ProductsController } from '../controllers/ProductsController';

const router = Router();
const productsController = new ProductsController();

router.get('/products', productsController.getAllProducts.bind(productsController)); // Obtener todos los productos
router.post('/products', productsController.addProduct.bind(productsController)); // Añadir un nuevo producto
router.put('/products/:id', productsController.updateProductQuantity.bind(productsController)); // Actualizar cantidad de un producto

export default router;
