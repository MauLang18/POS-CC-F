export interface QuoteResponse {
  quoteId: number;
  voucherNumber: string;
  customer: string;
  total: number;
  auditCreateDate: Date;
  status: string;
  icReport: object;
  icVisibility: object;
  icCancel: object;
}

export interface ProductDetailsResponse {
  productServiceId: number;
  image: string;
  code: string;
  name: string;
  category: string;
  quantity: number;
  price: number;
  total: number;
  icAdd: object;
}

export interface QuoteByIdResponse {
  quoteId: number;
  voucherTypeId: number;
  voucherNumber: string;
  customerId: number;
  paymentMethodId: number;
  observation: string;
  subTotal: number;
  applyIVA: number;
  iva: number;
  discount: number;
  total: number;
  statusId: number;
  quoteDetails: QuoteDetailByIdResponse[];
}

export interface QuoteDetailByIdResponse {
  productServiceId: number;
  image: string;
  code: string;
  name: string;
  quantity: number;
  price: number;
  total: number;
}
