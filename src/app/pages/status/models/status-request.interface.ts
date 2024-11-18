export interface StatusRequest {
  name: string;
  description: string;
  state: number;
}

export interface StatusUpdateRequest {
  statusId: number;
  name: string;
  description: string;
  state: number;
}
