export interface ProjectRequest {
  internalName: string;
  commercialName: string;
  customerId: number;
  categoryId: number;
  startDate: Date;
  endDate: Date;
  statusId: number;
  projectDetails: ProjectDetailRequest[];
}

export interface ProjectDetailRequest {
  requirement: string;
  stateId: number;
}

export interface ProjectUpdateRequest {
  projectId: number;
  internalName: string;
  commercialName: string;
  customerId: number;
  categoryId: number;
  startDate: Date;
  endDate: Date;
  statusId: number;
  projectDetails: ProjectDetailRequest[];
}
