export interface DocumentTypeRequest {
    name: string;
    abbreviation: string;
    state: number;
  }
  
  export interface DocumentTypeUpdateRequest {
    documentTypeId: number;
    name: string;
    abbreviation: string;
    state: number;
  }