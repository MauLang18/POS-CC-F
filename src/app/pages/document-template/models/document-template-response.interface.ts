export interface DocumentTemplateResponse {
    documentTemplateId: number;
    name: string;
    templateType: string;
    content: string;
    auditCreateDate: Date;
    state:number;
    stateDocumentTemplate: any;
    badgeColor: string;
    icDownload: any;
    icEdit: any;
    icDelete: any;
  }
  
  export interface DocumentTemplateByIdResponse {
    documentTemplateId: number;
    name: string;
    templateTypeId: number;
    content: string;
    state: number;
  }