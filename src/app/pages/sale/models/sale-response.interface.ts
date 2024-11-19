export interface SaleResponse {
  saleId: number;
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

export interface SaleByIdResponse {
  saleId: number;
  voucherTypeId: number;
  voucherNumber: string;
  customerId: number;
  projectId: number;
  quoteId: number;
  paymentMethodId: number;
  observation: string;
  subTotal: number;
  applyIVA: number;
  iva: number;
  discount: number;
  total: number;
  statusId: number;
  saleDetails: SaleDetailByIdResponse[];
}

export interface SaleDetailByIdResponse {
  productServiceId: number;
  image: string;
  code: string;
  name: string;
  quantity: number;
  price: number;
  total: number;
}
