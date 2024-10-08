export interface ILoginResponse {
  accessToken: string;
  expiresIn: number
}

export interface IResponse<T> {
  data: T;
}

export interface IUser {
  id?: number;
  name?: string;
  lastname?: string;
  email?: string;
  password?: string;
  active?: boolean;
  createdAt?: string;
  updatedAt?: string;
  authorities?: IAuthority[];
  role?: IRole
}

export interface IAuthority {
  authority: string;
}

export interface IFeedBackMessage {
  type?: IFeedbackStatus;
  message?: string;
}

export enum IFeedbackStatus {
  success = "SUCCESS",
  error = "ERROR",
  default = ''
}

export enum IRoleType {
  user = "USER",
  superAdmin = 'SUPER_ADMIN_ROLE'
}

export interface IRole {
  createdAt: string,
  description: string,
  id: number
  name : string,
  updatedAt: string
}

export interface IGame {
  id?: number
  name?: string,
  imgURL?: string,
  status?: string,
  description?: string,
  createdAt?: string,
  updatedAt?: string
}

export interface ICategory {
  id?: number,
  name?: string,
  descripcion?: string
}

export interface IProduct {
  id?: number;
  name?: string;
  descripcion?: string;
  price?: number;
  stock?: number;
  category?: ICategory; 
}
