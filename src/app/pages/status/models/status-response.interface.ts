export interface StatusResponse {
  statusId: number;
  name: string;
  description: string;
  auditCreateDate: Date;
  state: number;
  stateStatus: any;
  badgeColor: string;
  icDownload: any;
  icEdit: any;
  icDelete: any;
}

export interface StatusByIdResponse {
  statusId: number;
  name: string;
  description: string;
  state: number;
}
