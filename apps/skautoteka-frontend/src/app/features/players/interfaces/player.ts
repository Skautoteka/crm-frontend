import { IGender, IGenericModel } from '@skautoteka-frontend/common';
import { Team } from '../../teams/interfaces/team';
import { Position } from './position';

export type Player = {
  id: string;
  firstName: string;
  lastName: string;
  name: string;
  sex: IGender;
  height: number;
  age: string;
  nationality: string;
  team: Team;
  position: Position;
} & IGenericModel;
