export interface IModelResponse<T> {
  success: boolean;
  added: T & IGenericResponse;
}

interface IGenericResponse {
  createdAt: string;
  updatedAt: string;
}
