import { IGenericModel } from '@skautoteka-frontend/common';

export type Description = {
  id: number;
  reportId: string;
  mentalDescription: string;
  physicalDescription: string;
  technicalDescription: string;
} & IGenericModel;
