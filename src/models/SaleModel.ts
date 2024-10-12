// models/SaleModel.ts

export interface SaleModel {
    branch: string;
    clientName: string;
    clientPhone: string;
    clientAddress: string;
    products: Array<{ productId: string; quantity: number; price: number }>;
    paymentMethod: string;
    cardDetails?: { cardNumber: string; expirationDate: string; cvv: string };
    date: string; // Agregamos la fecha de la venta
}
