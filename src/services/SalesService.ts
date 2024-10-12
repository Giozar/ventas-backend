// services/SalesService.ts

import { promises as fs } from 'fs';
import { SaleModel } from '../models/SaleModel';
import * as path from 'path';

const filePath = path.join(__dirname, '../data/sales.json');

export class SalesService {
    private async readSales(): Promise<SaleModel[]> {
        try {
            const data = await fs.readFile(filePath, 'utf-8');
            return JSON.parse(data);
        } catch (error) {
            return [];
        }
    }

    private async writeSales(sales: SaleModel[]): Promise<void> {
        await fs.writeFile(filePath, JSON.stringify(sales, null, 2));
    }

    public async createSale(sale: SaleModel): Promise<SaleModel> {
        const sales = await this.readSales();
        sales.push(sale); // Agregar la nueva venta
        await this.writeSales(sales);
        return sale; // Devolver la venta registrada
    }
}
