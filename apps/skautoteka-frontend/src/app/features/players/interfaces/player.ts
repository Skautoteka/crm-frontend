import { IGender, IGenericModel } from '@skautoteka-frontend/common';
import { Team } from '../../teams/interfaces/team';

export type Player = {
  id: string;
  firstName: string;
  lastName: string;
  sex: IGender;
  age: string;
  team: Team;
} & IGenericModel;
