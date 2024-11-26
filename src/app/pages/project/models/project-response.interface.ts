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
  projectDetails: ProjectDetailByIdResponse[];
}

export interface ProjectDetailByIdResponse {
  requirement: string;
  stateId: number;
  stateProject: string;
}
