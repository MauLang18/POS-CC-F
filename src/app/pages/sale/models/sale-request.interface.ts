export interface SaleRequest {
  observation: string;
  subtotal: number;
  iva: number;
  totalAmount: number;
  warehouseId: number;
  clientId: number;
  voucherNumber: string;
  voucherDocumentTypeId: number;
  saleDetails: SaleDetailRequest[];
}

export interface SaleDetailRequest {
  productId: number;
  quantity: number;
  unitSalePrice: number;
  total: number;
}