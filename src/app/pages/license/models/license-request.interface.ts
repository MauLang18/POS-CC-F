export interface LicenseRequest {
  projectId: number;
  licenseTypeId: number;
  issueDate: Date;
  expirationDate: Date;
  state: number;
}

export interface LicenseUpdateRequest {
  licenseId: number;
  projectId: number;
  licenseTypeId: number;
  issueDate: Date;
  expirationDate: Date;
  state: number;
}
