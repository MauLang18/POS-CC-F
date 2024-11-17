export interface CategoryResponse {
    categoryId: number;
    name: string;
    description: string;
    auditCreateDate: Date;
    state:number;
    stateCategory: any;
    badgeColor: string;
    icDownload: any;
    icEdit: any;
    icDelete: any;
  }
  
  export interface CategoryByIdResponse {
    categoryId: number;
    name: string;
    description: string;
    state: number;
  }