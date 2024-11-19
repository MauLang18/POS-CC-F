export interface TemplateTypeRequest {
  name: string;
  description: string;
  state: number;
}

export interface TemplateTypeUpdateRequest {
  templateTypeId: number;
  name: string;
  description: string;
  state: number;
}
