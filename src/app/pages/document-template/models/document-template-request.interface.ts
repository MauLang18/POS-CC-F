export interface DocumentTemplateRequest {
  name: string;
  templateTypeId: number;
  content: string;
  state: number;
}

export interface DocumentTemplateUpdateRequest {
  documentTemplateId: number;
  name: string;
  templateTypeId: number;
  content: string;
  state: number;
}
