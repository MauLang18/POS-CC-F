export interface LicenseResponse {
  licenseId: number;
  licenseKey: string;
  project: string;
  licenseType: string;
  issueDate: Date;
  expirationDate: Date;
  auditCreateDate: Date;
  state: number;
  stateLicense: any;
  badgeColor: string;
  icDownload: any;
  icEdit: any;
  icDelete: any;
}

export interface LicenseByIdResponse {
  licenseId: number;
  licenseKey: string;
  projectId: number;
  licenseTypeId: number;
  issueDate: Date;
  expirationDate: Date;
  state: number;
}
