export interface QuoteRequest {
  voucherTypeId: number;
  customerId: number;
  paymentMethodId: number;
  observation: string;
  subtotal: number;
  applyIVA: number;
  iva: number;
  discount: number;
  total: number;
  statusId: number;
  quoteDetails: QuoteDetailRequest[];
}

export interface QuoteDetailRequest {
  productServiceId: number;
  quantity: number;
  price: number;
  total: number;
}

export interface QuoteUpdateRequest {
  quoteId: number;
  statusId: number;
}
