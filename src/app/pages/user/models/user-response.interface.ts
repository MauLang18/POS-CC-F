export interface UserResponse {
  userId: number;
  userName: string;
  email: string;
  auditCreateDate: Date;
  state: number;
  stateUser: any;
  badgeColor: string;
  icDownload: any;
  icEdit: any;
  icDelete: any;
}

export interface UserByIdResponse {
  userId: number;
  userName: string;
  email: string;
  state: number;
}
