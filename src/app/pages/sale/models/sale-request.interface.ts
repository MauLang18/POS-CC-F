export interface SaleRequest {
  voucherTypeId: number;
  customerId: number;
  quoteId: number;
  projectId: number;
  observation: string;
  subtotal: number;
  applyIVA: number;
  iva: number;
  discount: number;
  total: number;
  statusId: number;
  saleDetails: SaleDetailRequest[];
}

export interface SaleDetailRequest {
  productServiceId: number;
  quantity: number;
  price: number;
  total: number;
}

export interface SaleUpdateRequest {
  saleId: number;
  statusId: number;
}
