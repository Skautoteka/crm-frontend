import { IGenericModel } from '@skautoteka-frontend/common';

export type Trait = {
  traitId: string;
  value: number;
  trait: {
    name: string;
  };
} & IGenericModel;
