export interface VoucherTypeRequest {
  name: string;
  abbreviation: string;
  state: number;
}

export interface VoucherTypeUpdateRequest {
  voucherTypeId: number;
  name: string;
  abbreviation: string;
  state: number;
}
