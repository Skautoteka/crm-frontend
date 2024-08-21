import { IGenericModel } from '@skautoteka-frontend/common';

export type Player = {
  id: string;
  firstName: string;
  lastName: string;
  sex: string;
  age: string;
} & IGenericModel;
