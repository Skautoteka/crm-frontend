export interface IFilter {
  predicates: FilterPredicate[];
  name: string;
  label: string;
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
