import { IGenericModel } from '@skautoteka-frontend/common';

export type Note = {
  name: string;
  status: 'IN_PROGRESS' | 'COMPLETED';
  playerNumber: number;
  content: string;
  evaluation: number;
  regionId: string;
  teamId: string;
  taskId: string | undefined;
} & IGenericModel;
