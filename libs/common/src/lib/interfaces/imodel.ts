export interface IModelResponse<T> {
  success: boolean;
  added: T & IGenericModel;
  updated: T & IGenericModel;
}

export interface IGenericModel {
  id: string;
  createdAt: string;
  updatedAt: string;
  searchQuery: string | null;
}

export interface IGenericDelete {
  success: boolean;
}

export enum IGender {
  Male = 'MALE',
  Female = 'FEMALE'
}
