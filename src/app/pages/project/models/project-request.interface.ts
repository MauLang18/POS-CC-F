export interface ProjectRequest {
  internalName: string;
  commercialName: string;
  customerId: number;
  categoryId: number;
  startDate: Date;
  endDate: Date;
  statusId: number;
  state: number;
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
  state: number;
}
