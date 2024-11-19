export interface SupplierResponse {
  supplierId: number;
  documentType: string;
  documentNumber: string;
  name: string;
  email: string;
  contactName: string;
  phone: string;
  address: string;
  auditCreateDate: Date;
  state: number;
  stateSupplier: any;
  badgeColor: string;
  icDownload: any;
  icEdit: any;
  icDelete: any;
}

export interface SupplierByIdResponse {
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
