export interface LicenseTypeResponse {
  licenseTypeId: number;
  name: string;
  description: string;
  auditCreateDate: Date;
  state: number;
  stateLicenseType: any;
  badgeColor: string;
  icDownload: any;
  icEdit: any;
  icDelete: any;
}

export interface LicenseTypeByIdResponse {
  licenseTypeId: number;
  name: string;
  description: string;
  state: number;
}
