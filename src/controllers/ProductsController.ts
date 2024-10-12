// controllers/ProductsController.ts

import { Request, Response } from 'express';
import { ProductsService } from '../services/ProductsService';
import { ProductModel } from '../models/ProductModel';

const productsService = new ProductsService();

export class ProductsController {
    public async getAllProducts(req: Request, res: Response): Promise<void> {
        try {
            const products = await productsService.getAllProducts();
            res.status(200).json(products);
        } catch (error) {
            res.status(500).json({ message: 'Error al obtener los productos' });
        }
    }

    public async addProduct(req: Request, res: Response): Promise<void> {
        const newProduct: ProductModel = req.body;

        try {
            await productsService.addProduct(newProduct);
            res.status(201).json({ message: 'Producto añadido con éxito' });
        } catch (error) {
            res.status(500).json({ message: 'Error al añadir el producto' });
        }
    }

    public async updateProductQuantity(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        const { quantity } = req.body;

        try {
            await productsService.updateProductQuantity(id, quantity);
            res.status(200).json({ message: 'Cantidad actualizada con éxito' });
        } catch (error) {
            res.status(500).json({ message: 'Error al actualizar la cantidad del producto' });
        }
    }
}
