import { IGenericModel } from '@skautoteka-frontend/common';
import { Player, Position } from '../../players/interfaces';
import { Trait } from './trait';
import { Description } from './description';

export type Report = {
  name: string;
  status: 'IN_PROGRESS' | 'COMPLETED';
  player: Player;
  playerId: string;
  positions: Position[];
  description: Description;
  traits: Trait[];
  taskId: string | undefined;
} & IGenericModel;
