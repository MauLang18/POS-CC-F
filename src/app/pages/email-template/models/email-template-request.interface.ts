export interface EmailTemplateRequest {
  subject: string;
  templateTypeId: number;
  body: string;
  state: number;
}

export interface EmailTemplateUpdateRequest {
  emailTemplateId: number;
  subject: string;
  templateTypeId: number;
  body: string;
  state: number;
}
