export interface UnitResponse {
  unitId: number;
  name: string;
  abbreviation: string;
  auditCreateDate: Date;
  state: number;
  stateUnit: any;
  badgeColor: string;
  icDownload: any;
  icEdit: any;
  icDelete: any;
}

export interface UnitByIdResponse {
  unitId: number;
  name: string;
  abbreviation: string;
  state: number;
}
