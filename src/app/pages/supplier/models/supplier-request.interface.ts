export interface SupplierRequest {
  documentTypeId: number;
  documentNumber: string;
  name: string;
  email: string;
  contactName: string;
  phone: string;
  address: string;
  state: number;
}

export interface SupplierUpdateRequest {
  supplierId: number;
  documentTypeId: number;
  documentNumber: string;
  name: string;
  email: string;
  contactName: string;
  phone: string;
  address: string;
  state: number;
}
