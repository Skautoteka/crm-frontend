export interface IModelResponse<T> {
  success: boolean;
  added: T & IGenericModelResponse;
}

interface IGenericModelResponse {
  createdAt: string;
  updatedAt: string;
}

export interface IGenericDeleteResponse {
  success: boolean;
}
