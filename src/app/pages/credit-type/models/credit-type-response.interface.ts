export interface CreditTypeResponse {
    creditTypeId: number;
    name: string;
    description: string;
    auditCreateDate: Date;
    state:number;
    stateCreditType: any;
    badgeColor: string;
    icDownload: any;
    icEdit: any;
    icDelete: any;
  }
  
  export interface CreditTypeByIdResponse {
    creditTypeId: number;
    name: string;
    description: string;
    state: number;
  }