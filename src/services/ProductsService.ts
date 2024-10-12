// services/ProductsService.ts

import { promises as fs } from 'fs';
import { ProductModel } from '../models/ProductModel';
import * as path from 'path';

const filePath = path.join(__dirname, '../data/products.json');
const directoryPath = path.dirname(filePath);

export class ProductsService {
    private async ensureDirectoryExists(): Promise<void> {
        try {
            await fs.access(directoryPath);
        } catch (error) {
            await fs.mkdir(directoryPath, { recursive: true });
        }
    }

    private async readProducts(): Promise<ProductModel[]> {
        try {
            const data = await fs.readFile(filePath, 'utf-8');
            return JSON.parse(data);
        } catch (error) {
            return [];
        }
    }

    private async writeProducts(products: ProductModel[]): Promise<void> {
        await this.ensureDirectoryExists();
        await fs.writeFile(filePath, JSON.stringify(products, null, 2));
    }

    public async getAllProducts(): Promise<ProductModel[]> {
        return await this.readProducts();
    }

    public async addProduct(newProduct: ProductModel): Promise<void> {
        const products = await this.readProducts();
        products.push(newProduct);
        await this.writeProducts(products);
    }

    public async updateProductQuantity(id: string, quantity: number): Promise<void> {
        const products = await this.readProducts();
        const productIndex = products.findIndex(product => product.id === id);
        if (productIndex !== -1) {
            products[productIndex].quantity = products[productIndex].quantity - quantity;
            await this.writeProducts(products);
        } else {
            throw new Error('Producto no encontrado');
        }
    }
}
