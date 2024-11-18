export interface InvoiceRequest {
  voucherTypeId: number;
  saleId: number;
  total: number;
  installmentsCount: number;
  paymentMethodId: number;
  statusId: number;
}

export interface InvoiceUpdateRequest {
  invoiceId: number;
  saleId: number;
  voucherTypeId: number;
  voucherNumber: string;
  sale: string;
  statusId: number;
  installmentsCount: number;
  paymentMethodId: number;
  paymentDate: Date;
  issueDate: Date;
}
