import { IGenericModel } from '@skautoteka-frontend/common';

export type Team = {
  id: string;
  name: string;
  country: string | null;
  city: string | null;
  league: string | null;
} & IGenericModel;
