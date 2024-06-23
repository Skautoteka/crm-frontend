import { IGenericModel } from '@skautoteka-frontend/common';

export type Report = {
  name: string;
  status: string;
} & IGenericModel;
