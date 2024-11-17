export interface EmailTemplateResponse {
  emailTemplateId: number;
  subject: string;
  templateTypeId: number;
  body: string;
  auditCreateDate: Date;
  state: number;
  stateEmailTemplate: any;
  badgeColor: string;
  icDownload: any;
  icEdit: any;
  icDelete: any;
}

export interface EmailTemplateByIdResponse {
  emailTemplateId: number;
  subject: string;
  templateTypeId: number;
  body: string;
  state: number;
}
