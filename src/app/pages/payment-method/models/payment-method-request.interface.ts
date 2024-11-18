export interface PaymentMethodRequest {
  projectId: number;
  name: string;
  state: number;
}

export interface PaymentMethodUpdateRequest {
  paymentMethodId: number;
  name: string;
  state: number;
}
