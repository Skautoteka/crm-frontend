import { Note } from '../../notes/interfaces/note';
import { Player } from '../../players/interfaces';
import { Report } from '../../reports/interfaces/report';

export interface AnalysisFiltersPaload {
  filters: ReportFilter[];
}

export type ReportFilter = {
  name: string;
  label: string;
};

export interface AnalysisResultPayload {
  entries: AnalysisResult[];
  type: 'note' | 'report';
}

export interface AnalysisResult {
  playerId: string;
  player: Player;
  playerNumber: null | number;
  related: AnalysisRelatedRecords[];
  value: AnalysisValue[];
}

export interface AnalysisValue {
  average: number;
  latestValue: number;
  name: string;
}

export type AnalysisRelatedRecords = (Note & Report)[];

export type NoteFilter = {
  name: string;
  label: string;
};

export interface PredicateFilterValue {
  value: string | number | null;
  predicate: FilterPredicate;
}

export enum FilterPredicate {
  lt = 'lt',
  le = 'le',
  gt = 'gt',
  ge = 'ge',
  eq = 'eq',
  ne = 'ne',
  avg_lt = 'avg_lt',
  avg_le = 'avg_le',
  avg_gt = 'avg_gt',
  avg_ge = 'avg_ge',
  avg_eq = 'avg_eq',
  avg_ne = 'avg_ne'
}
