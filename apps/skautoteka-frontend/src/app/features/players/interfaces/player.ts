import { IGender, IGenericModel } from '@skautoteka-frontend/common';
import { Team } from '../../teams/interfaces/team';

export type Player = {
  id: string;
  firstName: string;
  lastName: string;
  name: string;
  sex: IGender;
  age: string;
  team: Team;
  position: 'FORWARD' | 'DEFENSE' | 'WINGER';
} & IGenericModel;
