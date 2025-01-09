export interface ReportFiltersPayload {
  filters: ReportFilter[];
}

export type ReportFilter = {
  name: string;
};
