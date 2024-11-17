export interface SaleResponse {
  saleId: number;
  voucherNumber: string;
  provider: string;
  warehouse: string;
  totalAmount: number;
  dateOfSale: Date;
  icReport: object;
  icVisibility: object;
  icCancel: object;
}

export interface ProductDetailsResponse {
  productId: number;
  image: string;
  code: string;
  name: string;
  category: string;
  quantity: number;
  unitSalePrice: number;
  totalAmount: number;
  icAdd: object;
}

export interface SaleByIdResponse {
  saleId: number;
  voucherNumber: string;
  voucherDocumentTypeId: number;
  observation: string;
  subTotal: number;
  iva: number;
  totalAmount: number;
  clientId: number;
  warehouseId: number;
  saleDetails: SaleDetailByIdResponse[];
}

export interface SaleDetailByIdResponse {
  productId: number;
  image: string;
  code: string;
  name: string;
  quantity: number;
  unitSalePrice: number;
  totalAmount: number;
}
