export interface UserRequest {
  userName: string;
  password: string;
  email: string;
  state: number;
}

export interface UserUpdateRequest {
  userId: number;
  userName: string;
  password: string;
  email: string;
  state: number;
}
