export interface CustomerRequest {
  documentTypeId: number;
  documentNumber: string;
  name: string;
  email: string;
  contactName: string;
  phone: string;
  address: string;
  creditTypeId: number;
  discountPercent: number;
  creditInterestRate: number;
  creditLimit: number;
  state: number;
}

export interface CustomerUpdateRequest {
  customerId: number;
  documentTypeId: number;
  documentNumber: string;
  name: string;
  email: string;
  contactName: string;
  phone: string;
  address: string;
  creditTypeId: number;
  discountPercent: number;
  creditInterestRate: number;
  creditLimit: number;
  state: number;
}
