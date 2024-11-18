export interface PaymentMethodResponse {
  paymentMethodId: number;
  name: string;
  auditCreateDate: Date;
  state: number;
  statePaymentMethod: any;
  badgeColor: string;
  icDownload: any;
  icEdit: any;
  icDelete: any;
}

export interface PaymentMethodByIdResponse {
  paymentMethodId: number;
  name: string;
  state: number;
}
