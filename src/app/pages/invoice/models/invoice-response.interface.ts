export interface InvoiceResponse {
  invoiceId: number;
  voucherNumber: string;
  sale: string;
  total: number;
  auditCreateDate: Date;
  status: string;
  badgeColor: string;
  icDownload: any;
  icEdit: any;
  icDelete: any;
}

export interface InvoiceByIdResponse {
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
