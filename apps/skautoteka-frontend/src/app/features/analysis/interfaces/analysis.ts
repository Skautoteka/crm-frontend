export interface AnalysisFiltersPaload {
  filters: ReportFilter[];
}

export type ReportFilter = {
  name: string;
  label: string;
};

export type NoteFilter = {
  name: string;
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