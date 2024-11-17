export interface CustomerResponse {
    customerId: number;
    documentType: string;
    documentNumber: string;
    name: string;
    email: string;
    contactName: string;
    phone: string;
    address: string;
    creditType: string;
    discountPercent: number;
    creditInterestRate: number;
    creditLimit: number;
    auditCreateDate: Date;
    state:number;
    stateCustomer: any;
    badgeColor: string;
    icDownload: any;
    icEdit: any;
    icDelete: any;
  }
  
  export interface CustomerByIdResponse {
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