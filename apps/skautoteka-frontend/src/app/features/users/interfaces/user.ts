import { IGenericModel } from '@skautoteka-frontend/common';

export type User = {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  region: string;
  role: string;
} & IGenericModel;
