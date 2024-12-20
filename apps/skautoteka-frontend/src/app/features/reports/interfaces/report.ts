import { IGenericModel } from '@skautoteka-frontend/common';
import { Player } from '../../players/interfaces';

export type Report = {
  name: string;
  status: 'IN_PROGRESS' | 'COMPLETED';
  player: Player;
  taskId: string;
} & IGenericModel;
