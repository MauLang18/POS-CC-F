export interface CreditTypeRequest {
    name: string;
    description: string;
    state: number;
  }
  
  export interface CreditTypeUpdateRequest {
    creditTypeId: number;
    name: string;
    description: string;
    state: number;
  }