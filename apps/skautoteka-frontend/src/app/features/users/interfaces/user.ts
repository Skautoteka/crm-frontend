import { IGenericModel } from '@skautoteka-frontend/common';
import { Player } from '../../players/interfaces';

export type User = {
  name: string;
  status: 'IN_PROGRESS' | 'COMPLETED';
  player: Player;
} & IGenericModel;
