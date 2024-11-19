export interface TemplateTypeResponse {
  templateTypeId: number;
  name: string;
  description: string;
  auditCreateDate: Date;
  state: number;
  stateTemplateType: any;
  badgeColor: string;
  icDownload: any;
  icEdit: any;
  icDelete: any;
}

export interface TemplateTypeByIdResponse {
  templateTypeId: number;
  name: string;
  description: string;
  state: number;
}
