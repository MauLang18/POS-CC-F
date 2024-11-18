export interface ProjectResponse {
  projectId: number;
  internalName: string;
  commercialName: string;
  customer: string;
  category: string;
  startDate: Date;
  endDate: Date;
  status: string;
  auditCreateDate: Date;
  state: number;
  stateProject: any;
  badgeColor: string;
  icDownload: any;
  icEdit: any;
  icDelete: any;
}

export interface ProjectByIdResponse {
  projectId: number;
  internalName: string;
  commercialName: string;
  customerId: number;
  categoryId: number;
  startDate: Date;
  endDate: Date;
  statusId: number;
  state: number;
}
