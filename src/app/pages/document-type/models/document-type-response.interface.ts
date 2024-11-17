export interface DocumentTypeResponse {
    documentTypeId: number;
    name: string;
    abbreviation: string;
    auditCreateDate: Date;
    state:number;
    stateDocumentType: any;
    badgeColor: string;
    icDownload: any;
    icEdit: any;
    icDelete: any;
  }
  
  export interface DocumentTypeByIdResponse {
    documentTypeId: number;
    name: string;
    abbreviation: string;
    state: number;
  }