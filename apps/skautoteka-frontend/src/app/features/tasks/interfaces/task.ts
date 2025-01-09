import { IGenericModel } from '@skautoteka-frontend/common';
import { Team } from '../../teams/interfaces/team';

export type Task = {
  id: string;
  guestTeam: Team;
  hostTeam: Team;
  location: string;
  startDate: string;
  status: 'IN_PROGRESS' | 'COMPLETED';
  assignedToId: string | null;
  type: boolean;
} & IGenericModel;
