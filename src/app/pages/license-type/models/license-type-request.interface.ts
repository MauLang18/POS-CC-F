export interface LicenseTypeRequest {
  name: string;
  description: string;
  state: number;
}

export interface LicenseTypeUpdateRequest {
  licenseTypeId: number;
  name: string;
  description: string;
  state: number;
}
