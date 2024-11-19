export interface VoucherTypeResponse {
  voucherTypeId: number;
  name: string;
  abbreviation: string;
  auditCreateDate: Date;
  state: number;
  stateVoucherType: any;
  badgeColor: string;
  icDownload: any;
  icEdit: any;
  icDelete: any;
}

export interface VoucherTypeByIdResponse {
  voucherTypeId: number;
  name: string;
  abbreviation: string;
  state: number;
}
